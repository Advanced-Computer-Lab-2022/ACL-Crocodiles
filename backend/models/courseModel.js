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
        type: [String],
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
     Exercise: {
        type: String
    //     type: Schema.Types.ObjectId, 
       //  ref: 'Exercise'
    },
}, { timestamps: true })

const course = mongoose.model('Course', courseSchema)
const sub = mongoose.model('Subtitle', subtitleSchema)
module.exports = {course, sub}



//EXERCISE SCHEMA
