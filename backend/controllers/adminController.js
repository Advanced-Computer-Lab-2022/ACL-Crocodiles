
const Instructor = require('../models/instructorModel')
const CorporateTrainee = require('../models/corporatetraineeModel')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const createAdmin = async (req,res) => {
    const {Email,Password} = req.body
    const Type = 'Admin'
        
    try{
        let user = await User.findOne({Email})
        if (user)
            res.status(400).json({error:'User Already exists'})
        else{
            const salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(Password,salt)
            user = await User.create({Email,Password:hash,Type})
            
        }
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}


const createInstructor = async (req,res) => {
    
    const {Email,Password} = req.body
    const Type = 'Instructor'
    console.log({Email,Password})    
    try{
        let user = await User.findOne({Email})
        if (user)
            res.status(400).json({error:'User Already exists'})
        else{
            const salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(Password,salt)
            user = await User.create({Email,Password:hash,Type})
            console.log(user)
            const instructor =  await Instructor.create({_id:user._id})
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
            const salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(Password,salt)
            user = await User.create({Email,Password:hash,Type})
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


