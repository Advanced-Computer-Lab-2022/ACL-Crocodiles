const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseRatingSchema = new Schema({
    CourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Username: {
        type: String,
        required: false
    },
    Rating: {
        type: Number,
        required: true
    },
    Review: {
        type: String,
        required: false
    }
}, { timestamps: true })

const instructorRatingSchema = new Schema({
    InstructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Rating: {
        type: Number,
        required: true
    },
    Review: {
        type: String,
        required: false
    }
}, { timestamps: true })

const courseRatingModel = mongoose.model('CourseRating', courseRatingSchema)
const instructorRatingModel = mongoose.model('InstructorRating', instructorRatingSchema)
module.exports = { courseRatingModel, instructorRatingModel }