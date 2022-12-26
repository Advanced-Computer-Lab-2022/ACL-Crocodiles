const express = require('express')

const {
    viewAllCourses,
    Search,
    filterCoursePrice,
    filterCourse,
    viewRatingAndReviews,
    CourseDetails,
 
} = require('../controllers/guestController')

const router = express.Router()

router.get('/viewAllCourses',viewAllCourses)
router.post('/search',Search)
router.post('/filterbyprice', filterCoursePrice)
router.post('/filterbysr', filterCourse)
router.get('/viewratingandreviews/:courseid', viewRatingAndReviews)
router.get('/coursedetails/:id',CourseDetails)

module.exports = router