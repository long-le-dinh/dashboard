const mongoose = require("mongoose");
const bluebird = require("bluebird");
const connectDB = () => {
  mongoose.Promise = bluebird;
  return mongoose.connect('mongodb+srv://long:long@cluster0.em9gapd.mongodb.net/Test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
};
module.exports = connectDB;
