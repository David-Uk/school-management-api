/* eslint-disable no-underscore-dangle */
const AysncHandler = require('express-async-handler');
const Program = require('../../model/Academic/Program');
const Subject = require('../../model/Academic/Subject');
const Admin = require('../../model/Staff/Admin');
const YearGroup = require('../../model/Academic/YearGroup');
const AcademicYear = require('../../model/Academic/AcademicYear');

// @desc Create year group
// @route POST /api/v1/years-group
// @access  Private
exports.createYearGroup = AysncHandler(async (req, res) => {
  const {
    name, academicYear,
  } = req.body;
  // check if exists
  const yearGroup = await YearGroup.findOne({ name });
  if (yearGroup) {
    throw new Error('Year group already exists');
  }
  // create
  const subjectYearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });
  // push academic into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.yearGroups.push(subjectYearGroup);
  await admin.save();
  res.status(201).json({
    status: 'success',
    message: 'Year group created successfully',
    data: subjectYearGroup,
  });
});

// @desc  get all year groups
// @route GET /api/v1/year-groups
// @acess  Private
exports.getYearGroups = AysncHandler(async (req, res) => {
  const subjectYearGroup = await YearGroup.find();

  res.status(201).json({
    status: 'success',
    message: 'Academic years fetched successfully',
    data: subjectYearGroup,
  });
});

// @desc  get single year group
// @route GET /api/v1/year-groups/:id
// @acess  Private
exports.getYearGroup = AysncHandler(async (req, res) => {
  const subjectYearGroup = await YearGroup.findById(req.params.id);

  res.status(201).json({
    status: 'success',
    message: 'Year group fetched successfully',
    data: subjectYearGroup,
  });
});

// @desc   Update year group
// @route  DELETE /api/v1/year-groups/:id
// @acess  Private
exports.updateYearGroup = AysncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  // check name exists
  const createYearGroupFound = await YearGroup.findOne({ name });
  if (createYearGroupFound) {
    throw new Error('Year group already exists');
  }
  const subjectYearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    },
  );

  res.status(201).json({
    status: 'success',
    message: 'Year group updated successfully',
    data: subjectYearGroup,
  });
});

// @desc   Update year group
// @route  DELETE /api/v1/year-groups/:id
// @acess  Private
exports.deleteYearGroup = AysncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
    message: 'Year group deleted successfully',
  });
});
