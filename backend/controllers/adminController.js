const Admin = require('../models/adminModel')
const Trainee = require('../models/traineeModel')
const Instructor = require('../models/instructorModel')
const mongoose = require('mongoose')

const createAdmin = async (req,res) => {
    const {Email,Password} = req.body
    try{
        const admin = await Admin.create({Email,Password})
        res.status(200).json(admin)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}
const createTrainee = async (req,res) => {
    const {Email,Password} = req.body
    try{
        const trainee = await Trainee.create({Email,Password})
        res.status(200).json(trainee)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}

const createInstructor = async (req,res) => {
    const {Username,Password} = req.body
    try{
        const instructor = await Instructor.create({Username,Password})
        res.status(200).json(instructor)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}
/*
const createCorporateTrainee = async (req,res) => {
    const {Email,Password} = req.body
    try{
        const corporatetrainee = await CorporateTrainee.create({Email,Password})
        res.status(200).json(corporatetrainee)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}
*/
module.exports = {
    createAdmin,
    createTrainee,
    createInstructor
}


