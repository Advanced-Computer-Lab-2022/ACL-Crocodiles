const mongoose = require('mongoose')
const Schema = mongoose.Schema

//COURSES SCHEMA
const courseSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Discount: {
        type: Number,
        required: false
    },
    Hours: {
        type: Number,
        required: true
    },
    Summary: {
        type: String,
        required: false
    },
    InstructorId: {
        type: mongoose.Schema.Types.ObjectId,   
        ref:'Instructor',
        required: true
    },
    Rating: {
        type: Number,
        required: false
    },
    Subtitle: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Subtitle',
        //ref: 'subtitleSchema'
        required: false
    },
}, { timestamps: true })



//SUBTITLES SCHEMA
const subtitleSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Hours: {
        type: Number,
        required: true
    },
    
    // CourseId: {
    //     type: Number,
    //     required: false
    // },
     Exercises: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
        required: false,
   
    //     type: Schema.Types.ObjectId, 
       //  ref: 'Exercise'
    },
    Videos:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Video',
        required: false
    }
}, { timestamps: true })


//Exercise SCHEMA
const exerciseSchema = new Schema({
    Title:{
        type:String,
        required:true
    },

    Questions: {
        type: [String],
        required: true
    },
    Options: {
        type: [[String]],
        required: true
    },
    Answers: {
        type: [Number],
        required: true
    },
}, { timestamps: true })

//Video Schema

const videoSchema = new Schema({
    Title:{
        type:String,
        required:true
    },

    url: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: false
    },
}, { timestamps: true })

const course = mongoose.model('Course', courseSchema)
const sub = mongoose.model('Subtitle', subtitleSchema)
const ex = mongoose.model('Exercise', exerciseSchema)
const video = mongoose.model('Video', videoSchema)
module.exports = {course, sub,ex,video}



