const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instructorSchema = new Schema({
    _id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    
    Username: {
      type: String,
      required: false
    },
    Firstname: {
        type: String,
        required: false,
    },
    Lastname: {
        type: String,
        required: false,
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
        type: String,
        required: false,
    },
    Biography:{
        type: String,
        required: false
    },
    Rating:{
        type: Number,
        required: false,
        default : 0  
    },
    RatingCount: {
      type: Number,
      required: false,
      default : 0 
    },
    My_Courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref:'Course',
      required: false
    },
    

  }, { timestamps: true });
  
  module.exports = mongoose.model('Instructor', instructorSchema);