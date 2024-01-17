const express = require('express');
const {
  createYearGroup,
  getYearGroup,
  getYearGroups,
  updateYearGroup,
  deleteYearGroup,
} = require('../../controller/academics/subjects');

const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const yearGroupRouter = express.Router();

yearGroupRouter.route('/')
  .post(isLogin, isAdmin, createYearGroup)
  .get('/', isLogin, isAdmin, getYearGroups);

yearGroupRouter.route('/:id')
  .get('/:id', isLogin, isAdmin, getYearGroup)
  .put('/:id', isLogin, isAdmin, updateYearGroup)
  .delete('/:id', isLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;
