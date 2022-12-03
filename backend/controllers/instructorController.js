const Instructor = require('../models/instructorModel')
const Course = require('../models/courseModel').course
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Validator = require('validator')
const createCourse = async (req, res) => {
    const InstructorId  = req.user

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
    const InstructorId  = req.user
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



const editBiographyorEmail = async (req,res) => {
    const {Email,Biography} = req.body
    if(!Validator.isEmail(Email))
        res.status(400).json({error:'incorrect email format'})
    const id  = req.user
    const userupdated = await User.findByIdAndUpdate(id,{Email:Email})
    const updated = await Instructor.findByIdAndUpdate(id,{Biography:Biography})
    res.status(200).json({updated,userupdated})
}



const viewAllInsCourses = async (req,res) => {
   
    try {

        const InstructorId  = req.user
        if(!mongoose.Types.ObjectId.isValid(InstructorId)){ 
            return res.status(404).json({error: 'no such id'})
        }
        
        const courses = await Course.find({InstructorId: InstructorId})
        if(!courses){
            return res.status(404).json({error: 'no courses found'})
        }
            res.status(200).json(courses)
        
     } catch (error) {
       res.status(400).json({error: 'error'})
     }
}





module.exports = {
    searchCourse,
    createCourse,
    viewAllInsCourses,
    editBiographyorEmail
}