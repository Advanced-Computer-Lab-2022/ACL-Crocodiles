const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//COURSES SCHEMA
const courseSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Count: {
      type: Number,
      required: false,
      default: 0,
    },
    Discount: {
      type: Number,
      required: false,
      default: 0,
    },
    DiscountEndDate: {
      type: Date,
      required: false,
    },
    Hours: {
        type: Number,
        default: 0
    },
    Summary: {
      type: String,
      required: false,
    },
    InstructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    InstructorName: { type: String, required: true },
    Rating: {
      type: Number,
      required: false,
      default: 0,
    },
    RatingCount: {
      type: Number,
      required: false,
      default: 0,
    },
    Subtitle: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Subtitle",
      //ref: 'subtitleSchema'
      required: false,
    },
    PreviewVideo: {
        type: String,
        required: false
    },
}, { timestamps: true })



//SUBTITLES SCHEMA
const subtitleSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Hours: {
      type: Number,
      required: true,
    },

    Exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: false,
      },
    ],
    Videos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Video",
      required: false,
    },
  },
  { timestamps: true }
);


//Exercise SCHEMA
// const exerciseSchema = new Schema({
//     Title:{
//         type:String,
//         required:true
//     },

//     Questions: {
//         type: [String],
//         required: true
//     },
//     Options: {
//         type: [[String]],
//         required: true
//     },
//     Answers: {
//         type: [Number],
//         required: true
//     },
// }, { timestamps: true })

//Video Schema

const videoSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: false,
    },
}, { timestamps: true })

courseSchema.statics.deleteDiscounts = async function () {
    const courses = await this.find()
    courses.forEach(async (course) => {
        if (course.DiscountEndDate < Date.now()) {
            course.Discount = 0
            course.DiscountEndDate = undefined
            await course.save()
        }
    })
}


const course = mongoose.model("Course", courseSchema);
const sub = mongoose.model("Subtitle", subtitleSchema);
//const ex = mongoose.model('Exercise', exerciseSchema)
const video = mongoose.model("Video", videoSchema);
module.exports = { course, sub, video };
