const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const traineeSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Firstname: {
      type: String,
      required: true,
    },
    Lastname: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: false,
    },
    Age: {
      type: Number,
      required: false,
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
  },
  
  { timestamps: true }
);

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

module.exports = mongoose.model("Trainee", traineeSchema);
