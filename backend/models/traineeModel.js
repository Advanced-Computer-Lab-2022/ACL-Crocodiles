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
      type : {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Course',
      required: true
    },
    My_assignments:{
      type: [{
        quiz_id: {     
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exam',
          required: true
        },
        Answer:
        {
          type: [String],
          required: true
        }
        

      }],
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