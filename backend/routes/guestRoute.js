const express = require('express')

const {
    viewAllCourses,
    Search,
    filterCoursePrice,
    filterCourse,
    CourseDetails,
 
} = require('../controllers/guestController')

const router = express.Router()

router.get('/viewAllCourses',viewAllCourses)
router.post('/search',Search)
router.post('/filterbyprice', filterCoursePrice)
router.post('/filterbysr', filterCourse)
router.get('/coursedetails/:id',CourseDetails)

module.exports = router