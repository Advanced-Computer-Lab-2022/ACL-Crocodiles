const mongoose = require('mongoose')
const Schema = mongoose.Schema

const problemSchema = new Schema({
    submitter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        enum: ['Technical', 'Financial', 'Other'],
        default: 'Technical',
        required: true,
    },
    Status: {
        type: String,
        enum: ['unseen', 'pending', 'resolved'],
        required: true,
    }



}, { timestamps: true });





module.exports = mongoose.model('Problem', problemSchema);