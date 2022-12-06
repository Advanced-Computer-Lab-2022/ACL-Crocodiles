const Instructor = require('../models/instructorModel')
const Course = require('../models/courseModel').course
const Sub = require('../models/courseModel').sub
const Video = require('../models/courseModel').video
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Validator = require('validator')
const createCourse = async (req, res) => {
    const InstructorId  = req.user

    const { Title, Subject, Hours, Price} = req.body
    if(!mongoose.Types.ObjectId.isValid(InstructorId)){ 
        return res.status(404).json({error: 'no such id'})
    }
    try {
        const course = await Course.create({ Title, Subject, Hours, Price, InstructorId})
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createSubtitle = async (req, res) => {
    const InstructorId  = req.user
    const {subtitle,subHours,videoTitle,videoURL,videoDesc} = req.body
    const courseId = req.params.courseid
    if(!mongoose.Types.ObjectId.isValid(InstructorId)){
        return res.status(404).json({error: 'no such id'})
    }
    try {
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({error: 'no such course'})
        }
        const sub = await Sub.create({Title: subtitle, Hours: subHours})
        course.Subtitle.push(sub)
        await course.save()
        const video = await Video.create({Title: videoTitle, Description: videoDesc, url: videoURL})
        sub.Videos.push(video)
        await sub.save()
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createVideo = async (req, res) => {
    const InstructorId  = req.user
    const {videoTitle, videoDesc, videoURL, subId} = req.body
    if(!mongoose.Types.ObjectId.isValid(InstructorId)){
        return res.status(404).json({error: 'no such id'})
    }
    try {
        const sub = await Sub.findById(subId)
        if(!sub){
            return res.status(404).json({error: 'no such subtitle'})
        }
        const video = await Video.create({videoTitle, videoDesc, videoURL})
        sub.Videos.push(video)
        await sub.save()
        res.status(200).json(sub)
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
        const courses =  await Course.find({ Price: { $gte: priceMin}}).find({Price:{ $lte: priceMax } })
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

const defineDiscount = async (req,res) => {
    const NewDiscount = req.body.discountint
    const EndDate = req.body.enddate
    const CourseID = req.params.courseid
    console.log('CourseID'+CourseID)
    console.log('reqpa '+ JSON.stringify(req.params) )
    console.log('reqbody '+ JSON.stringify(req.body) )
    console.log('NewDiscount '+ NewDiscount)
    console.log('EndDate '+ EndDate)
    if(!mongoose.Types.ObjectId.isValid(CourseID)){ 
        return res.status(404).json({error: 'no such course id'})
    }
    try {
        //find the course and update it with the new values instead of the null values
        const course = await Course.findByIdAndUpdate(CourseID,{$set:{Discount:NewDiscount,DiscountEndDate:EndDate}},{new:true})
        console.log('course title: '+course.Title)
        if(!course){
            return res.status(404).json({error: 'no such course'})
        }
    res.status(200).json(course)}
    catch (error) {
        res.status(400).json({ error: 'error' })
    }
}
const getRating = async (req,res) => {
    const id = req.user
    try {
        const rating = await Instructor.findById(id).select({Rating:1})
        if(!rating){
            return res.status(404).json({error: 'rating is null'})
        }
        res.status(200).json(rating)
    } catch (error) {
        res.status(400).json({ error: 'error' })
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
    editBiographyorEmail,
    defineDiscount,
    getRating,
    createSubtitle,
    createVideo
}