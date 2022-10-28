const Trainee = require('../models/traineeModel')

const mongoose = require('mongoose')
const Course = require('../models/courseModel')

const createTrainee = async (req,res) => {
    const {Name,Email,Age} = req.body
    try{
        const trainee = await Trainee.create({Name,Email,Age})
        res.status(200).json(trainee)
  } catch (error) {
      res.status(400).json({error: error.message})
  }}


const getTrainees = async (req,res) => {
    const trainees = await Trainee.find({}).sort({createdAt:-1}).select({Name:1})
    res.status(200).json(trainees)
}

const getTrainee = async (req,res) => {
    const{ id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such trainee'})
    }

    const trainee = await Trainee.findById(id)
    if(!trainee){
        return res.status(404).json({error: 'no such trainee2'})
    }
    res.status(200).json(trainee)
}
const deleteTrainee = async (req,res) => {
    const{ id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such trainee3'})
    }
    const trainee = await Trainee.findByIdAndDelete(id)
    //or you can use Workout.findOneAndDelete({_id: id})

    if(!trainee){
        return res.status(404).json({error: 'no such trainee4'})
    }
    res.status(200).json(trainee)
}

const updateTrainee = async (req,res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such trainee5'})
    }
    const trainee = await Trainee.findOneAndUpdate(id,req.body)
    if(!trainee){
        return res.status(404).json({error: 'no such trainee6'})
    }
    res.status(200).json(trainee)
}

const viewAllCourses = async (req,res) => {
    try {
        const courses = await Course.find().select({Title:1,Subject:1,Hours:1,Price:1,InsructorId:1})
        if(!courses){
            return res.status(404).json({error: 'no courses found'})
        }
            res.status(200).json(courses)
        
     } catch (error) {
       res.status(400).json({error: 'error'})
     }
}

const filterCoursePrice = async (req,res) => {
    try {
	const {priceMin,priceMax} = req.body
	    const courses = await Course.find({Price: { $gte: priceMin} && {$lte: priceMax}})
	    if(!courses){
	        return res.status(404).json({error: 'no courses found'})
	    }
	    res.status(200).json(courses)
} catch (error) {
	res.status(400).json({error: 'error'})
}
}

module.exports = {
    getTrainees,
    getTrainee,
    createTrainee,
    deleteTrainee,
    updateTrainee,
    viewAllCourses,
    filterCoursePrice
}