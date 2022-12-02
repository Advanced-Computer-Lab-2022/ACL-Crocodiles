const Guest = require('../models/guestModel.js');
const Course = require('../models/courseModel.js').course;
const mongoose = require('mongoose');

const createGuest = async (req, res) =>{
    const {Country} = req.body
    try{
        const guest = await Guest.create({Country})
        res.status(200).json(guest)
  } catch (error) {
      res.status(400).json({error: error.message})
}
};

const getGuest =  async (req, res) => {
    const{ id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'invalid id'});

    const guest = await Guest.findById(id);
    if(!guest)
        return res.status(404).json({error: 'no such guest'});
    res.json(guest);
};

const getCourses = async(req, res) => {
    const courses = await Course.find({}).select({Title: 1, Hours: 1, Rating: 1});
    if(!courses)
        return res.status(404).json("There are currently no available courses");
    res.json(courses);
}

const getPrice = async(req, res) => {
    const cid = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(cid)){
        return res.status(404).json({error: 'invalid input'})}

    const course = await Course.findById(cid);

    if(!course)
        return res.status(404).json("course not found");
    res.json(course.Price);
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
    createGuest,
    getCourses,
    getGuest,
    getPrice,
    viewAllCourses
 };
 