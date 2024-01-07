/* eslint-disable no-underscore-dangle */
const AsyncHandler = require('express-async-handler');
const AcademicTerm = require('../../model/Academic/AcademicTerm');
const Admin = require('../../model/Staff/Admin');

// @desc Create Academic Year
// @route POST /api/v1/academic-years
// @acess  Private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  const academicTerm = await AcademicTerm.find({ name });
  if (academicTerm) throw new Error('Academic term already exists');

  const academicTermCreated = await AcademicTerm.create({
    name, description, duration, createdBy: req.userAuth._id,
  });
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicTerms.push(academicTermCreated._id);

  await admin.save();
  res.status(201).json({
    status: 'Success',
    message: 'Academic year created',
    data: academicTermCreated,
  });
});

// @desc  get all Academic Terms
// @route GET /api/v1/academic-terms
// @acess  Private
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();

  res.status(201).json({
    status: 'success',
    message: 'Academic years fetched successfully',
    data: academicTerms,
  });
});

// @desc  get single Academic Term
// @route GET /api/v1/academic-terms/:id
// @acess  Private
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.findById(req.params.id);

  res.status(201).json({
    status: 'success',
    message: 'Academic years fetched successfully',
    data: academicTerms,
  });
});

// @desc   Update  Academic Term
// @route  PUT /api/v1/academic-terms/:id
// @acess  Private
exports.updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  // check name exists
  const createAcademicTermFound = await AcademicTerm.findOne({ name });
  if (createAcademicTermFound) {
    throw new Error('Academic year already exists');
  }
  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    },
  );

  res.status(201).json({
    status: 'success',
    message: 'Academic term updated successfully',
    data: academicTerm,
  });
});

// @desc   Delete  Academic Term
// @route  PUT /api/v1/academic-terms/:id
// @acess  Private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
    message: 'Academic year deleted successfully',
  });
});
