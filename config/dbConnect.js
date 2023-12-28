/* eslint-disable no-console */
const mongoose = require('mongoose');

const dbConnect = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('DB connected successfully');
  } catch (error) {
    console.log('DB connection failed', error.message);
  }
};

// dbConnect();
module.exports = dbConnect;
