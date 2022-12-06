const Instructor = require('../models/instructorModel')
const Course = require('../models/courseModel').course
const Question = require('../models/examModel').question
const Subtitle = require('../models/courseModel').sub
const Exam = require('../models/examModel').exam
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Validator = require('validator')


var Questions = [{}]

const createCourse = async (req, res) => {
    const InstructorId = req.user

    const { Title, Subject, Hours, Price } = req.body
    if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        const course = await Course.create({ Title, Subject, Hours, Price, InstructorId })
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const searchCourse = async (req, res) => {
    const InstructorId = req.user
    const { Title, Subject } = req.body
    if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        const course = await Course.find().or([{ Title: Title }, { Subject: Subject }]).and([{ InstructorId: InstructorId }])
        if (!course) {
            return res.status(404).json({ error: 'no such course' })
        }
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const editBiographyorEmail = async (req, res) => {
    const { Email, Biography } = req.body
    if (!Validator.isEmail(Email))
        res.status(400).json({ error: 'incorrect email format' })
    const id = req.user
    const userupdated = await User.findByIdAndUpdate(id, { Email: Email })
    const updated = await Instructor.findByIdAndUpdate(id, { Biography: Biography })
    res.status(200).json({ updated, userupdated })
}



const viewAllInsCourses = async (req, res) => {

    try {

        const InstructorId = req.user
        if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
            return res.status(404).json({ error: 'no such id' })
        }

        const courses = await Course.find({ InstructorId: InstructorId })
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)

    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}

const defineDiscount = async (req, res) => {
    const NewDiscount = req.body.discountint
    const EndDate = req.body.enddate
    const CourseID = req.params.courseid
    console.log('CourseID' + CourseID)
    console.log('reqpa ' + JSON.stringify(req.params))
    console.log('reqbody ' + JSON.stringify(req.body))
    console.log('NewDiscount ' + NewDiscount)
    console.log('EndDate ' + EndDate)
    if (!mongoose.Types.ObjectId.isValid(CourseID)) {
        return res.status(404).json({ error: 'no such course id' })
    }
    try {
        //find the course and update it with the new values instead of the null values
        const course = await Course.findByIdAndUpdate(CourseID, { $set: { Discount: NewDiscount, DiscountEndDate: EndDate } }, { new: true })
        console.log('course title: ' + course.Title)
        if (!course) {
            return res.status(404).json({ error: 'no such course' })
        }
        res.status(200).json(course)
    }
    catch (error) {
        res.status(400).json({ error: 'error' })
    }
}

const createQuestion = async (req, res) => {

    const { QuestionHeader, Answer1, Answer2, Answer3, Answer4, correctAnswer } = req.body
    const examID = await Exam.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).select('_id')


    try {
        const examQuestion = await Question.create({ QuestionHeader, Answer1, Answer2, Answer3, Answer4, correctAnswer })
        const qid = await Question.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).select('_id')
        const examm = await Exam.updateOne({ _id: examID }, { $push: { Questions: qid } })
        res.status(200).json(Questions)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createExam = async (req, res) => {

    const InstructorId = req.user
    //const courseId = req.params.courseid
    const subtitleId = "638bb8348553b938065a1588"




    if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        Questions = []
        const exam = await Exam.create({ subtitleId, Questions, InstructorId })
        const eid = await Exam.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).select('_id')
        console.log(eid)
        const examm = await Subtitle.updateOne({ _id: subtitleId }, { $push: { Exercises: eid } })
        res.status(200).json(exam)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const viewExams = async (req, res) => {

    const f = await Exam.find().populate('Questions')
    res.status(200).json(f)
}

module.exports = {
    searchCourse,
    createCourse,
    viewAllInsCourses,
    editBiographyorEmail,
    defineDiscount,
    createExam,
    createQuestion,
    viewExams
}