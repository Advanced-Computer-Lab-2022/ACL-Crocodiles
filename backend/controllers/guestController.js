const Instructor = require('../models/instructorModel.js')
const Course = require('../models/courseModel.js').course;
const mongoose = require('mongoose');
const { findOne } = require('../models/instructorModel.js');
const CourseRating = require('../models/ratingAndReviewModel.js').courseRatingModel;
const Trainee = require('../models/traineeModel.js')
const jwt = require('jsonwebtoken')

const Search = async (req, res) => {
    const { Username, Title, Subject } = req.body

    try {
        const instructor = await User.find({ Username }).select({ id: 1 })
        if (!instructor) {
            return res.status(404).json({ error: 'Couldnt find instructor' })
        }
        const courses = await Course.find().or([{ InstructorId: instructor }, { Title: Title }, { Subject: Subject }])
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }

}
const filterCourse = async (req, res) => {
    try {
        const { Subject, Rating } = req.body


        const course = await Course.find({ Subject }).find({ Rating: { $gte: Rating } })
        if (!course) {
            return res.status(404).json({ error: 'no such course' })
        }
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }

}

const filterCoursePrice = async (req, res) => {
    try {
        const { priceMin, priceMax } = req.body
        const courses = await (await Course.find({ Price: { $gte: priceMin } }).find({ Price: { $lte: priceMax } }))
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}

const getPrice = async (req, res) => {
    const cid = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(cid)) {
        return res.status(404).json({ error: 'invalid input' })
    }

    const course = await Course.findById(cid);

    if (!course)
        return res.status(404).json("course not found");
    res.json(course.Price);
}
const viewAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)

    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}
const viewRatingAndReviews = async (req, res) => {
    const courseid = req.params.courseid
    // if (!mongoose.Types.ObjectId.isValid(courseid)) {
    //     return res.status(404).json({ error: 'invalid input' })
    // }
    try {
        const courseRating = await CourseRating.find({CourseId: courseid})
        if (!courseRating) {
            return res.status(404).json({ error: 'no course ratings found found' })
        }
        console.log(courseRating)
        res.status(200).json(courseRating)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}
const CourseDetails = async (req,res) => {
    const {id} = req.params
    try{
        const coursedetails = await Course.findOne({_id:id}).populate({ path: 'Subtitle', populate: { path: 'Exercises' } })
        .populate({ path: 'Subtitle', populate: { path: 'Videos' } });
        const instructorid = await Course.findOne({_id:id}).select('InstructorId')

        const othercourses = await Course.find({InstructorId:instructorid.InstructorId , _id:{$ne:id}})
        const instructordetails = await Instructor.findOne({_id:instructorid.InstructorId})
        if(!coursedetails)
            return res.status(404).json({ error: 'no courses found' })
        res.status(200).json({coursedetails,othercourses,instructordetails})
    } catch(error){

    }
}
const addCourse = async (req,res) => {
    const {id,token,trainee} = req.params
    console.log(id,trainee,token)
    const secret = process.env.SECRET
    const verify = jwt.verify(token, secret)
    if (verify){
    res.redirect("http://localhost:3000")
    const product = await Trainee.updateOne({ _id: trainee }, { $push: { My_courses: {_id:id} } })
    console.log(product)
    }
}


module.exports = {
    Search,
    getPrice,
    viewAllCourses,
    filterCoursePrice,
    filterCourse,
    viewRatingAndReviews,
    CourseDetails,
    addCourse
};
