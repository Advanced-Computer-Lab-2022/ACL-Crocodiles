
const Instructor = require('../models/instructorModel')
const CorporateTrainee = require('../models/corporatetraineeModel')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Course = require('../models/courseModel').course
const CourseRequest = require('../models/courseRequestModel')

const createAdmin = async (req,res) => {
    const {Username,Email,Password} = req.body
    const Type = 'Admin'
        
    try{
        let useru = await User.findOne({Username})
        if (useru)
            res.status(400).json({error:'User Already exists'})
        let usere = await User.findOne({Email})
            if (usere)
            res.status(400).json({error:'Email Already in use'})
        else{
            const salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(Password,salt)
            const user = await User.create({Username,Email,Password:hash,Type})
            
        }
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}


const createInstructor = async (req,res) => {
    
    const {Username,Email,Password} = req.body
    const Type = 'Instructor' 
    try{
        let useru = await User.findOne({Username})
        if (useru)
            res.status(400).json({error:'User Already exists'})
        let usere = await User.findOne({Email})
            if (usere)
            res.status(400).json({error:'Email Already in use'})
        else{
            const salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(Password,salt)
            const user = await User.create({Username,Email,Password:hash,Type})
            console.log(user)
            const instructor =  await Instructor.create({_id:user._id})
            res.status(200).json(instructor)
        }
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}

const createCorporateTrainee = async (req,res) => {
    const {Username,Email,Password} = req.body
    const Type = 'Corporate'
        

    try{
        let useru = await User.findOne({Username})
        if (useru)
            res.status(400).json({error:'User Already exists'})
        let usere = await User.findOne({Email})
            if (usere)
            res.status(400).json({error:'Email Already in use'})
        else{
            const salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(Password,salt)
            const user = await User.create({Username,Email,Password:hash,Type})
            const corporatetrainee =  await CorporateTrainee.create({_id:user._id})
            res.status(200).json(corporatetrainee)
        }
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}

const setPromotion = async (req,res) => {
    const {courseid,discount,enddate} = req.body
    console.log(req.body)
    if (!mongoose.Types.ObjectId.isValid(courseid))
        return res.status(404).json({ error: 'wrong courseid' })
    try {
        const course = await Course.findByIdAndUpdate(courseid, {$set: { Discount: discount, DiscountEndDate: enddate }})
        if (!course) {
            return res.status(404).json({ error: 'no course found' })
        }
        res.status(200).json(course)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const setPromotionAllCourses = async (req,res) => {
    const {discount,enddate} = req.body
    try {
        const courses = await Course.updateMany({}, {$set: { Discount: discount, EndDate: enddate }})
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getPendingCourseRequests = async (req,res) => {
    try {
        const requests = await CourseRequest.find({Status:'Pending'})
        res.status(200).json(requests)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const grantCourseAccess = async (req,res) => {
    const {CourseID,TraineeID} = req.body
    console.log(CourseID,TraineeID)
    try {
        const trainee = await CorporateTrainee.findById(TraineeID)
        trainee.My_courses.push(CourseID)
        await trainee.save()
        console.log(trainee)
        if (!trainee) {
            return res.status(404).json({ error: 'no trainee found' })
        }
        const request = await CourseRequest.updateOne({CourseID,TraineeID}, {$set: {Status:'Granted'}})
        console.log(request)
        if (!request) {
            return res.status(404).json({ error: 'no request found' })
        }
        res.status(200).json({trainee,request})
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const denyCourseAccess = async (req,res) => {
    const {CourseID,TraineeID} = req.body
    console.log(CourseID,TraineeID)
    try {
        const request = await CourseRequest.updateOne({CourseID,TraineeID}, {$set: {Status:'Denied'}})
        console.log(request)
        if (!request) {
            return res.status(404).json({ error: 'no request found' })
        }
        res.status(200).json(request)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createAdmin,
    createInstructor,
    createCorporateTrainee,
    setPromotionAllCourses,
    setPromotion,
    getPendingCourseRequests,
    grantCourseAccess,
    denyCourseAccess
}