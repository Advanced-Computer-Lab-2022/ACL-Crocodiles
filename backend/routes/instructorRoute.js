const express = require('express')

const {
    createCourse,
    searchCourse,
    filterCourse,
    filterCoursePrice,
    Search,
    viewAllCourses,
    createExam,
    createQuestion,
    viewExams
    // updateInstructor

} = require('../controllers/instructorController')

const router = express.Router()
router.get('/viewAllCourses', viewAllCourses)
router.post('/createcourse', createCourse)
router.post('/createexam/:courseId', createExam)
router.post('/createquestion', createQuestion)

//router.get('/filtersubjectprice/:id',getCourses1)
router.post('/filter', filterCourse)
router.post('/getcoursebyid', searchCourse)
router.post('/filterbyprice', filterCoursePrice)
router.post('/search', Search)
router.post('/viewExam', viewExams)
//router.put('/:id',updateInstructor)

module.exports = router