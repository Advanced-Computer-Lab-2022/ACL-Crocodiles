const Trainee = require('../models/traineeModel')

const mongoose = require('mongoose')
const Instructor = require('../models/instructorModel')
const Course = require('../models/courseModel').course
const Subtitle = require('../models/courseModel').sub


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
        const courses = await Course.find()
        if(!courses){
            return res.status(404).json({error: 'no courses found'})
        }
            res.status(200).json(courses)
        
     } catch (error) {
       res.status(400).json({error: 'error'})
     }
}

const filterCoursePrice = async (req,res) => {
    const {priceMin,priceMax} = req.body
    const courses = await Course.find({Price: { $gte: priceMin}}, {Price: { $lte: priceMax}})
    if(!courses){
        return res.status(404).json({error: 'no courses found'})
    }
    res.status(200).json(courses)
}
const getSubtitles = async(req,res) => {
    const {IDs} = req.body
    const subtitles = []
    for(let i=0;i<IDs.length;i++){
        if(!mongoose.Types.ObjectId.isValid(IDs[i])){ 
            return res.status(404).json({error: 'Invalid subtitle ID'})
        }
        const subtitle = await Subtitle.findById(IDs[i])
        if(subtitle)
        subtitles.push(subtitle)
    else
    res.status(500).json(error)
    }
    res.json(subtitles)
    console.log(subtitles)
}

const getMyCourses = async(req, res)=>{
    const ID  = req.user
    const courses = [];
    if(!mongoose.Types.ObjectId.isValid(ID)){
      
        return res.status(404).json({error: 'Invalid trainee ID'});
    }
    const trainee = await Trainee.findById(ID);
    if(!trainee)
        return res.status(400).json({error: 'trainee not found'});

 
    const course_ids = trainee.My_courses;

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
    res.json(course);

}

const getMyTraineehelper = async(req,res)=>{
    const user_id = "6388125dee64b3e1ceaa7a0c";

    if(!mongoose.Types.ObjectId.isValid(user_id))
        return res.status(404).json({error: 'Invalid user id'});
    
     const trainee  = await Trainee.findById(user_id)
                                   .populate({path:'My_courses', populate: {path:'course_id' } })
                                    .populate({path:'My_courses', populate: {path:'Assignments', populate: {path:"exercise_id"} } });

         if(!trainee)
         res.status(500).json({error:"failed"});
      return(trainee);
 

 }
 
 const getMyTrainee = async(req,res)=>{
    const trainee = await getMyTraineehelper(req,res);
         res.json(trainee);;
 

 }

 
 const getMyCourse = async(req,res)=>{
    
const trainee = await getMyTraineehelper(req,res);
console.log(trainee)
 const course_id =  req.params.id
 if(!mongoose.Types.ObjectId.isValid(course_id))
 return res.status(404).json({error: 'Invalid course id'}); 
 const course  = await Course.findById(course_id)
 for(let i=0;i<trainee.My_courses.length;i++){
   console.log(trainee.My_courses[i].course_id)
   console.log(course._id)
   if(trainee.My_courses[i].course_id.equals(course._id)){
       const t= await trainee.populate({path:`My_courses.${i}.course_id`, populate:{path:'Subtitle', populate:["Exercises","Videos"]}})
    
       res.json(t.My_courses[i])
   }
 }
}


const findSub = async(req,res)=>{
    const sub_id = req.params.id;
 
    if(!mongoose.Types.ObjectId.isValid(sub_id))
        return res.status(404).json({error: 'Invalid course id'});
     const sub  = await Subtitle.findById(sub_id).populate('Exercises').populate('Videos');
     if(!sub)
        res.status(500).json({error: 'Subtitle not found'});
     res.json(sub);
 
 }

 const rateCourse = async(req,res)=>{
    const courseID = req.params.id;
    const value = req.body.value;
    if(!mongoose.Types.ObjectId.isValid(courseID)){ 
        return res.status(404).json({error: 'no such course id'})
    }
    try {
        let course1 = await Course.findById(courseID);
        const newRating = (course1.Rating*course1.RatingCount + value) / (course1.RatingCount + 1)
        course1 = await course1.update({Rating:newRating,RatingCount:course1.RatingCount+1})
        res.status(200)
    }
    catch(error){
        console.log(error)
        res.status(400).json(error)
    }
 }

const rateInstructor = async(req,res)=>{
    const courseID = req.params.id;
    const {value1} = req.body;
    if(!mongoose.Types.ObjectId.isValid(courseID)){ 
        return res.status(404).json({error: 'no such course id'})
    }
    try {
        const course1 = await Course.findById(courseID);
        const instructorID = course1.InstructorId
        let instructor = await Instructor.findById(instructorID)
        if (!instructor)
            res.status(404).json({error: 'no such instructor id'})
        const newRating = (instructor.Rating*instructor.RatingCount + value1) / (instructor.RatingCount + 1)
        instructor = await instructor.update({Rating:newRating,RatingCount:(instructor.RatingCount+1)})
        res.status(200)
    }
    catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports = {
    getTrainees,
    getTrainee,
    createTrainee,
    deleteTrainee,
    updateTrainee,
    viewAllCourses,
    getSubtitles,
    getMyCourses,
    findCourse,
    findSub,
    getMyTrainee,
    getMyCourse,
    rateCourse,
    rateInstructor
}