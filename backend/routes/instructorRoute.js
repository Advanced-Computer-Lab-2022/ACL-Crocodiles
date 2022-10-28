const express = require('express')

const {
    createCourse,
    searchCourse,
    filterCourse,
    filterCoursePrice
    // updateInstructor

} = require('../controllers/instructorController')

const router = express.Router()

router.post('/createcourse', createCourse)
//router.get('/filtersubjectprice/:id',getCourses1)
router.get('/filter/:id', filterCourse)
router.post('/getcoursebyid', searchCourse)
router.post('/filterbyprice', filterCoursePrice)
//router.put('/:id',updateInstructor)

module.exports = router