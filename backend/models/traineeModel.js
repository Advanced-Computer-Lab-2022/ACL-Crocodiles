const mongoose = require('mongoose')
const Schema = mongoose.Schema

const traineeSchema = new Schema({
    _id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    Firstname: {
      type: String,
      required: true,
    },
    Lastname: {
      type: String,
      required: true,
    },
    Gender:{
      type:String,
      required:false
    },
    Age: {
      type: Number,
      required: false,
    
    },
   
  }, { timestamps: true });
  
  module.exports = mongoose.model('Trainee', traineeSchema);
 
