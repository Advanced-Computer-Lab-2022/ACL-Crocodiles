const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instructorSchema = new Schema({
    Username: {
      type: String,
      required: true,
    },
    Firstname: {
        type: String,
        required: false,
    },
    Lastname: {
        type: String,
        required: false,
    },
    Email: {
      type: String,
      required: false
    },
    Password: {
      type:String,
      required: true
    },
    Age: {
      type: Number,
      required: false,
    },
    Country: {
      type: String,
      required: false
    },
    Gender: {
        type: [String],
        required: false,
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Instructor', instructorSchema);