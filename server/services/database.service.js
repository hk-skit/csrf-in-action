const mongoose = require('mongoose');

const connect = (uri, options) => {
  mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    ...options
  });
  return mongoose.connection;
};

module.exports = {
  connect
};
