const express = require('express')
const requireAuthInstructor = require('../middleware/requireAuthInstructor')
const {
    createCourse,
    searchCourse,
    filterCourse,
    filterCoursePrice,
    Search,
    viewAllCourses,
    createExam,
    createQuestion,
    viewExams,
    viewAllInsCourses,
    editBiographyorEmail,
    defineDiscount

} = require('../controllers/instructorController')


const router = express.Router()

router.use(requireAuthInstructor)
router.get('/viewAllinsCourses', viewAllInsCourses)
router.get('/viewAllCourses', viewAllCourses)
router.post('/createcourse', createCourse)
router.post('/createexam/:courseid', createExam)
router.post('/createquestion', createQuestion)

//router.get('/filtersubjectprice/:id',getCourses1)
router.post('/filter', filterCourse)
router.post('/getcoursebyid', searchCourse)
router.post('/filterbyprice', filterCoursePrice)
router.post('/search', Search)
router.post('/viewExam', viewExams)
router.put('/editbiographyoremail', editBiographyorEmail)
router.post('/definediscount/:courseid', defineDiscount)

module.exports = router