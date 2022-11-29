
const Instructor = require('../models/instructorModel')
const CorporateTrainee = require('../models/CorporatetraineeModel')
const User = require('../models/userModel')

const mongoose = require('mongoose')

const createAdmin = async (req,res) => {
    const {Email,Password} = req.body
    const Type = 'Admin'
        
    try{
        let user = await User.findOne({Email})
        if (user)
            res.status(400).json({error:'User Already exists'})
        else{
            user = await User.create({Email,Password,Type})
            const admin =  await Admin.create({_id:user._id})
            res.status(200).json(admin)
        }
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}


const createInstructor = async (req,res) => {
    
    const {Username,Email,Password} = req.body
    const Type = 'Instructor'
        
    try{
        let user = await User.findOne({Email})
        if (user)
            res.status(400).json({error:'User Already exists'})
        else{
            user = await User.create({Email,Password,Type})
            const instructor =  await Instructor.create({_id:user._id,Username,})
            res.status(200).json(instructor)
        }
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}

const createCorporateTrainee = async (req,res) => {
    const {Email,Password} = req.body
    const Type = 'Corporate'
        
    try{
        let user = await User.findOne({Email})
        if (user)
            res.status(400).json({error:'User Already exists'})
        else{
            user = await User.create({Email,Password,Type})
            const corporatetrainee =  await CorporateTrainee.create({_id:user._id})
            res.status(200).json(corporatetrainee)
        }
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}

module.exports = {
    createAdmin,
    createInstructor,
    createCorporateTrainee
}


