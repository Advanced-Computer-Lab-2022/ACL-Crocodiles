const Instructor = require('../models/instructorModel')
const Course = require('../models/courseModel').course
const Exam = require('../models/examModel').exam
const Question = require('../models/examModel').question
const mongoose = require('mongoose')

var Questions = [{}]
//var qCount = 0

const createCourse = async (req, res) => {
    const InstructorId = mongoose.Types.ObjectId("63571220ae3847e24aceec21")

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
    const InstructorId = mongoose.Types.ObjectId("63571220ae3847e24aceec21")
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

const filterCourse = async (req, res) => {
    try {
        const { Subject, Rating } = req.body


        const course = await Course.find({ Subject }).find({ Rating: { $gte: Rating } })
        if (!course) {
            return res.status(404).json({ error: 'no such course' })
        }
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }

}

const filterCoursePrice = async (req, res) => {
    try {
        const { priceMin, priceMax } = req.body
        const courses = await (await Course.find({ Price: { $gte: priceMin } }).find({ Price: { $lte: priceMax } }))
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}
const Search = async (req, res) => {
    const { Username, Title, Subject } = req.body

    try {
        const instructor = await Instructor.find({ Username }).select({ id: 1 })
        if (!instructor) {
            return res.status(404).json({ error: 'Couldnt find instructor' })
        }
        const courses = await Course.find().or([{ InstructorId: instructor }, { Title: Title }, { Subject: Subject }])
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }

}


const viewAllCourses = async (req, res) => {

    try {

        const InstructorId = mongoose.Types.ObjectId("63571220ae3847e24aceec21")
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

// const createQuestion = async (req, res) => {

//     const { QuestionHeader, Answer1, Answer2, Answer3, Answer4, correctAnswer } = req.body
//     const examID = "6388d4f5fd80c10ce9986557"


//     try {

//         const examQuestion = await Question.create({ QuestionHeader, Answer1, Answer2, Answer3, Answer4, correctAnswer })
//         const qid = await Question.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).select('_id')
//         const examm = await Exam.updateOne({ _id: examID }, { $push: { Questions: qid } })
//         //const examm = await Exam.findByIdAndUpdate(examID, { Questions: qid })
//         console.log(examm)
//         qCount++
//         console.log(qCount)
//         questions.push(qid[0])
//         res.status(200).json(questions)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

// const createExam = async (req, res) => {

//     const InstructorId = mongoose.Types.ObjectId("63571220ae3847e24aceec21")
//     const courseId = mongoose.Types.ObjectId("6357bd41c9ccc02db9bc4000")


//     if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
//         return res.status(404).json({ error: 'no such id' })
//     }
//     try {
//         console.log(questions)
//         // const Questio = await Question.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1)
//         console.log(JSON.stringify(Questions))
//         const Questions = []
//         const exam = await Exam.create({ courseId, Questions, InstructorId })
//         //questions = []
//         res.status(200).json(exam)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }


const createQuestion = async (req, res) => {

    const { QuestionHeader, Answer1, Answer2, Answer3, Answer4, correctAnswer } = req.body
    const examID = await Exam.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).select('_id')


    try {

        const examQuestion = await Question.create({ QuestionHeader, Answer1, Answer2, Answer3, Answer4, correctAnswer })
        const qid = await Question.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).select('_id')
        const examm = await Exam.updateOne({ _id: examID }, { $push: { Questions: qid } })
        //const examm = await Exam.findByIdAndUpdate(examID, { Questions: qid })
        //console.log(examm)
        //qCount++
        //console.log(qCount)
        //questions.push(qid[0])
        res.status(200).json(Questions)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createExam = async (req, res) => {

    const InstructorId = req.user
    const { courseId } = req.params


    if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        //console.log(questions)
        // const Questio = await Question.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1)
        //console.log(JSON.stringify(Questions))
        //var Questions = []
        Questions = []
        const exam = await Exam.create({ courseId, Questions, InstructorId })
        //questions = []
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
    filterCourse,
    filterCoursePrice,
    Search,
    viewAllCourses,
    createExam,
    createQuestion,
    viewExams
}