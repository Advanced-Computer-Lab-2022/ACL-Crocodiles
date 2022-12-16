
const Instructor = require('../models/instructorModel')
const CorporateTrainee = require('../models/corporatetraineeModel')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Course = require('../models/courseModel').course

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
    try {
        const course = await Course.findByIdAndUpdate(courseid, {$set: { Discount: discount, EndDate: enddate }})
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

module.exports = {
    createAdmin,
    createInstructor,
    createCorporateTrainee,
    setPromotionAllCourses,
    setPromotion
}