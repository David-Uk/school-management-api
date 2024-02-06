const express = require('express');
const {
  adminRegisterTeacher,
  loginTeacher,
} = require('../../controller/staff/teachersCtrl');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const teachersRouter = express.Router();

teachersRouter.post('/admin/register', isLogin, isAdmin, adminRegisterTeacher);
teachersRouter.post('/login', loginTeacher);

module.exports = teachersRouter;
