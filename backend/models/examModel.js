const mongoose = require('mongoose')
const Schema = mongoose.Schema

//EXAM SCHEMA
const examSchema = new Schema({

    Title: {
        type: String,
        required: false
    },

    subtitleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtitle',
        required: true
    },

    Questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }],

    InstructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
}, { timestamps: true })


//QUESTIONS SCHEMA
const questionSchema = new Schema({

    QuestionHeader: {
        type: String,
        required: true
    },

    Answer1: {
        type: String,
        required: true
    },
    Answer2: {
        type: String,
        required: true
    },
    Answer3: {
        type: String,
        required: true
    },
    Answer4: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
}, { timestamps: true })


const exam = mongoose.model('Exam', examSchema)
const question = mongoose.model('Question', questionSchema)
module.exports = { exam, question }

