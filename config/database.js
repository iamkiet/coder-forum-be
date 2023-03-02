const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

const connect = () =>
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Database connection successfully');
    })
    .catch((error) => {
      console.log('Database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });

module.exports = { connect };
