const mongoose = require('mongoose')
const Schema = mongoose.Schema

const corporatetraineeSchema = new Schema({
  _id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
    },
    Firstname: {
      type: String,
      required: false,
    },
    Lastname: {
      type: String,
      required: false,
    },
    Gender: {
      type: String,
      required: false,
    },
    My_course_requests: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false
    },
    My_courses: {
      type: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          Progress: {
            type: {
              value: {
                type: Number,
                required: true,
                default: 0,
              },
              seen: {
                type: [Number],
                required: true,
                default: [0, 0],
              },
              total: {
                type: Number,
                required: true,
                default: 0,
              },
            },
          },
          My_Notes: {
            type: [
              {
                video_id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Video",
                  required: true,
                },
                Notes: {
                  type: [String],
                  required: true,
                },
              },
            ],
            required: false,
          },
        },
      ],
      required: false,
    },
    My_assignments: {
      type: [
        {
          course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          quiz_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
          },
          Answer: {
            type: [String],
            required: true,
          },
        },
      ],
      required: false,
    },
    // My_problems: {
    //   type: [{
    //     course_id: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Problem',
    //       required: true
    //     }
    //   }],
    //   required: false
    // },
    Watched_videos: {
      type: [
        {
          video_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            required: true,
          },
          course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
        },
      ],
      required: false,
    },
    finishedandMailed:{
      type:[
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          }
        }
      ]
    }

  }, { timestamps: true })
  module.exports = mongoose.model('CorporateTrainee', corporatetraineeSchema);
 
