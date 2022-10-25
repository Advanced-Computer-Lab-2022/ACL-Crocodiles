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
        required: true
    },
    Hours: {
        type: Number,
        required: true
    },
    Summary: {
        type: String,
        required: true
    },
    InstructorId: {
        type: Object,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    },
    Subtitle: {
        type: String,
        //ref: 'subtitleSchema'
        required: false
    },
}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)

/*//SUBTITLES SCHEMA
const subtitleSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Hours: {
        type: Number,
        required: true
    },
    CourseId: {
        type: Number,
        required: false
    },
    // Exercise: {
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Exercise'
    // },
}, { timestamps: true })
*/
//module.exports = mongoose.model('Subtitle', subtitleSchema)


//EXERCISE SCHEMA
