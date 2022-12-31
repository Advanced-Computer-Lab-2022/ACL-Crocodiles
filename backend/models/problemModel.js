const mongoose = require('mongoose')
const Schema = mongoose.Schema

const problemSchema = new Schema({
    submitter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submitter_username: {
        type: String,
        required: true
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    course_title: {
        type: String,
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
        required: true,
    },
    Status: {
        type: String,
        enum: ['unseen', 'pending', 'resolved'],
        default: 'unseen',
        required: true,
    },
    Comments: [{
        type: String,
    }]



}, { timestamps: true });





module.exports = mongoose.model('Problem', problemSchema);