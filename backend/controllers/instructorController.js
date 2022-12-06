const Instructor = require('../models/instructorModel')
const Course = require('../models/courseModel').course
const Sub = require('../models/courseModel').sub
const Video = require('../models/courseModel').video
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Validator = require('validator')
const createCourse = async (req, res) => {
    const InstructorId  = req.user

    const { Title, Subject, Hours, Price, subtitle, subHours, videoTitle, videoDesc, videoURL } = req.body
    if(!mongoose.Types.ObjectId.isValid(InstructorId)){ 
        return res.status(404).json({error: 'no such id'})
    }
    try {
        const video = await Video.create({Title:videoTitle, Description:videoDesc, url:videoURL})
        const sub = await Sub.create({Title:subtitle, Hours:subHours, Videos:video})
        const course = await Course.create({ Title, Subject, Hours, Price, InstructorId, Subtitle:sub })
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
        console.log(req.user)
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
const viewAllCourses = async (req,res) => {
    try {
        const courses = await Course.find()
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
    filterCourse,
    filterCoursePrice,
    Search,
    viewAllInsCourses,
    viewAllCourses,
    editBiographyorEmail
}