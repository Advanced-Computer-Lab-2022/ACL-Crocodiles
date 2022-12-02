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
    My_courses: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false
    }
   
  }, { timestamps: true });
  
  
//new schema

  // const traineeSchema = new Schema({
  //   _id:{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref:'User',
  //     required:true
  //   },
  //   Firstname: {
  //     type: String,
  //     required: true,
  //   },
  //   Lastname: {
  //     type: String,
  //     required: true,
  //   },
  //   Gender:{
  //     type:String,
  //     required:false
  //   },
  //   Age: {
  //     type: Number,
  //     required: false,
    
  //   },
  //   My_courses: {
  //     type: [{
  //       course_id:{
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref:'Course',
  //         required: true
  //       },
  //       Assignments:{
  //         type: [{
  //           exercise_id:{
  //             type: [mongoose.Schema.Types.ObjectId],
  //             ref:'Exercise',
  //             required:true
  //           },
  //           Answers:{
  //             type: [Number],
  //             required:true
  //           }
  //         }],
  //         required:false
  //       } 
  //     }],
  //     required: false
  //   } 
   
  // }, { timestamps: true });



  module.exports = mongoose.model('Trainee', traineeSchema);
 
