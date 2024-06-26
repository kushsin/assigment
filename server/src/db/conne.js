// const mongoose  = require('mongoose')
// mongoose.connect('mongodb://0.0.0.0:27017/NEWKUSH')
// .then(() => {
//     console.log("connected to database");
// }).catch((e) => {
//     console.error("could not connect to the database");
// });
const mongoose = require("mongoose");
const connectDB = (url) => {
  return mongoose.connect(url)
  .then(() => {
    console.log('database connected')
  }).catch(() => {
    console.log('database connection failed')
  })
};
module.exports = connectDB;