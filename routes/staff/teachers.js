const express = require('express');
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getTeacherByAdmin,
} = require('../../controller/staff/teachersCtrl');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const teachersRouter = express.Router();

teachersRouter.post('/admin/register', isLogin, isAdmin, adminRegisterTeacher);
teachersRouter.post('/login', loginTeacher);
teachersRouter.get('/admin', isLogin, isAdmin, getAllTeachersAdmin);
teachersRouter.get('/:teacherID/admin', isLogin, isAdmin, getTeacherByAdmin);
module.exports = teachersRouter;
