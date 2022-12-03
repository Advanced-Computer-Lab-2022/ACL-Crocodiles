const Instructor = require('../models/instructorModel.js')
const Course = require('../models/courseModel.js').course;
const mongoose = require('mongoose');

const Search = async (req, res) => {
    const { Username, Title, Subject } = req.body

    try {
        const instructor = await Instructor.find({ Username }).select({ id: 1 })
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



module.exports = {
    Search,
    getPrice,
    viewAllCourses,
    filterCoursePrice,
    filterCourse
};
