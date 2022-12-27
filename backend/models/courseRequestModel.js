const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseRequestSchema = new Schema({
    TraineeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CorporateTrainee',
        required: true
    },
    CourseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    TraineeUsername: {
        type: String,
        required: true
    },
    CourseTitle: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ['Pending', 'Granted', 'Denied'],
        default: 'Pending'
    }
}, { timestamps: true })

module.exports = mongoose.model('CourseRequest', courseRequestSchema)
