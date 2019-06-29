const { connect } = require('mongoose');
const { DATABASE_URL } = require('./constants');


const connectDb = () => connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

module.exports = connectDb;
