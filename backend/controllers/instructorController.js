const Instructor = require('../models/instructorModel')
const Course = require('../models/courseModel')
const mongoose = require('mongoose')


const createCourse = async (req, res) => {
    const InstructorId  = mongoose.Types.ObjectId("63571220ae3847e24aceec21")

    const { Title, Subject, Hours, Price } = req.body
    if(!mongoose.Types.ObjectId.isValid(InstructorId)){ 
        return res.status(404).json({error: 'no such id'})
    }
    try {
        const course = await Course.create({ Title, Subject, Hours, Price, InstructorId })
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const searchCourse = async (req,res) => {
    const InstructorId  = mongoose.Types.ObjectId("63571220ae3847e24aceec21")
    const {Title,Subject} = req.body
    if(!mongoose.Types.ObjectId.isValid(InstructorId)){ 
        return res.status(404).json({error: 'no such id'})
    }
    try{
    const course = await Course.find().or([{Title:Title},{Subject:Subject}]).and([{InstructorId:InstructorId}])
    if(!course){
        return res.status(404).json({error: 'no such course'})
    }
    res.status(200).json(course)
    }catch(error){
    res.status(400).json({ error: error.message })
    }
    }

const filterCourse = async (req, res) => {
    try{
    const {Subject,Rating} =req.body
    

    const course = await Course.find({Subject}).find({ Rating:{ $gte: Rating}})
    if (!course) {
        return res.status(404).json({ error: 'no such course' })
    }
    res.status(200).json(course)
    }catch (error) {
    res.status(400).json({ error: 'error' })
    }
    
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
const Search = async(req,res)=>{
   const {Username,Title,Subject} = req.body

    try{
        const instructor = await Instructor.find({Username}).select({id:1})
        if (!instructor) {
            return res.status(404).json({ error: 'Couldnt find instructor' })
        }
        const courses = await Course.find().or([{InstructorId:instructor},{Title:Title},{Subject:Subject}])
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)
    }catch (error) {
        res.status(400).json({ error: 'error' })
    }

}





module.exports = {
    searchCourse,
    createCourse,
    filterCourse,
    filterCoursePrice,
    Search
}