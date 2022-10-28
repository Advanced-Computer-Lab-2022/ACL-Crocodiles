const Instructor = require('../models/instructorModel')
const Course = require('../models/courseModel')
const mongoose = require('mongoose')


const createCourse = async (req, res) => {
    //  const{ InstructorId } = req.params
    const { Title, Subject, Hours, Price, InstructorId } = req.body
    try {
        const course = await Course.create({ Title, Subject, Hours, Price, InstructorId })
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const searchCourse = async (req,res) => {
    const {InstructorId} = req.body
    const {Title} = req.body
    const {Subject} = req.body
    var course
    if (Title === null && Subject !== null)
        course = await Course.find({InstructorId}).find({Subject})
    else if (Subject === null && Title !== null)
        course = await Course.find({InstructorId}).find({Title})
    else
        course = await Course.find({InstructorId})
    if(!course){
        return res.status(404).json({error: 'no such course'})
    }
    res.status(200).json(course)
}

const filterCourse = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'invalid input' })
    }
    const myJSON = req.body


    const course = await Course.find({ InstructorId: { id } }).find(myJSON)
    if (!course) {
        return res.status(404).json({ error: 'no such course' })
    }
    res.status(200).json(course)
}

const filterCoursePrice = async (req, res) => {
    try {
        const { priceMin, priceMax } = req.body
        const courses = await (await Course.find({ Price: { $gte: priceMin}}).find({Price:{ $lte: priceMax } }))
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}



module.exports = {
    searchCourse,
    createCourse,
    filterCourse,
    filterCoursePrice
}