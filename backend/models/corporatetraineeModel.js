const mongoose = require('mongoose')
const Schema = mongoose.Schema

const corporatetraineeSchema = new Schema({
  _id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
    },
    My_course_requests: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false
    },
    My_courses: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false
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

  }, { timestamps: true })
  module.exports = mongoose.model('CorporateTrainee', corporatetraineeSchema);
 
