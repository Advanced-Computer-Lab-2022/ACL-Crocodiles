const Course = require('../models/courseModel').course
const mongoose = require('mongoose')
const CorpTrainee = require('../models/corporatetraineeModel')

const viewAllCourses = async (req,res) => {
    try {
        const courses = await Course.find().select({Title:1,Hours:1,Rating:1,price:1})
        if(!courses){
            return res.status(404).json({error: 'no courses found'})
        }
            res.status(200).json(courses)
        
     } catch (error) {
       res.status(400).json({error: 'no courses found'})
     }
}
const searchCourse = async (req,res) => {
    try{
    const course = await Course.find(req.body)
    if(!course){
        return res.status(404).json({error: 'no such course'})
    }
    res.status(200).json(course)
    } catch(error){
    res.status(400).json({error: 'no courses found'})
    }
}
const getMyCourses = async(req, res)=>{

    const ID  = "63892bcab6a043513f319d2d"
    const courses = [];
    if(!mongoose.Types.ObjectId.isValid(ID)){
      
        return res.status(404).json({error: 'Invalid trainee ID'});
    }
    const corpTrainee = await CorpTrainee.findById(ID);
    if(!corpTrainee)
        return res.status(400).json({error: 'trainee not found'});

 
    const course_ids = corpTrainee.My_courses;

    for(let i=0;i<course_ids.length;i++){
        const course_id = course_ids[i];
        if(!mongoose.Types.ObjectId.isValid(course_id))
            return res.status(404).json({error: 'Invalid course id'});
        const course  = await Course.findById(course_id)
        if(!course)
            res.status(500).json({error : "course not found"});
        courses.push(course);
     
    }
    res.json(courses);

}
const findCourse = async(req,res)=>{
    const course_id = req.params.id;
 
    if(!mongoose.Types.ObjectId.isValid(course_id))
        return res.status(404).json({error: 'Invalid course id'});
     const course  = await Course.findById(course_id)
                                 .populate({path:'Subtitle', populate: {path:'Exercises' } })
                                 .populate({path:'Subtitle', populate: {path:'Videos' } });
     if(!course)
        res.status(500).json(error);
        console.log(course)
     res.json(course);
 
 }

module.exports = {
    searchCourse,
    viewAllCourses,
    getMyCourses,
    findCourse
}
