const express = require('express')

const {
    createCourse,
    searchCourse,
    filterCourse,
    filterCoursePrice,
    Search,
    viewAllCourses
    // updateInstructor

} = require('../controllers/instructorController')

const router = express.Router()
router.get('/viewAllCourses',viewAllCourses)
router.post('/createcourse', createCourse)
//router.get('/filtersubjectprice/:id',getCourses1)
router.post('/filter', filterCourse)
router.post('/getcoursebyid', searchCourse)
router.post('/filterbyprice', filterCoursePrice)
router.post('/search', Search)
//router.put('/:id',updateInstructor)

module.exports = router