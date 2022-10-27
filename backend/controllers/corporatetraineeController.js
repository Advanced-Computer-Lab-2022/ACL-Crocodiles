const Course = require('../models/courseModel')
const mongoose = require('mongoose')

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
module.export = {
    searchCourse,
    viewAllCourses
}
