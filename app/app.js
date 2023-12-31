const express = require('express');
const morgan = require('morgan');
const {
  globalErrHandler,
  notFoundErr,
} = require('../middlewares/globalErrHandler');

const adminRouter = require('../routes/staff/adminRouter');

const app = express();

// Middlewares
app.use(express.json()); // pass incoming json data

app.use(morgan('dev'));

// Routes
app.use('/api/v1/admins', adminRouter);

// Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
