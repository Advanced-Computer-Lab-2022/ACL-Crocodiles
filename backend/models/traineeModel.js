const mongoose = require('mongoose')
const Schema = mongoose.Schema

const traineeSchema = new Schema({
    _id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique:true
    },
    Password: {
      type:String,
      required: true
    },
    Age: {
      type: Number,
      required: true,
    },
    BornIn: {
      type: String,
      required: false
    },
    LivesIn: {
      type: String,
      required: false
    },
    MartialStatus: {
      type: String,
      required: false
    },
    PhoneNumber: {
      type: String,
      required: false
    },
    Job: {
      type: String,
      required: false
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Trainee', traineeSchema);
 
