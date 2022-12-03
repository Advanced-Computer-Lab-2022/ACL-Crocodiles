const express = require('express')

const {
    viewAllCourses,
    Search,
    filterCoursePrice,
    filterCourse
 
} = require('../controllers/guestController')

const router = express.Router()

router.get('/viewAllCourses',viewAllCourses)
router.post('/search',Search)
router.post('/filterbyprice', filterCoursePrice)
router.post('/filterbysr', filterCourse)

module.exports = router