const express = require('express')
const requireAuthInstructor = require('../middleware/requireAuthInstructor')
const {
    createCourse,
    createExam,
    createQuestion,
    viewExams,
    viewAllInsCourses,
    editBiographyorEmail,
    defineDiscount,
    getRating,
    createSubtitle,
    createVideo
} = require('../controllers/instructorController')


const router = express.Router()

router.use(requireAuthInstructor)
router.get('/viewAllinsCourses', viewAllInsCourses)
//router.get('/viewAllCourses',viewAllCourses)
router.post('/createcourse', createCourse)
//router.post('/createexam/:courseid', createExam)
router.post('/createexam', createExam)
router.post('/createquestion', createQuestion)

//router.get('/filtersubjectprice/:id',getCourses1)

router.put('/editbiographyoremail',editBiographyorEmail)
router.post('/definediscount/:courseid',defineDiscount),
router.get('/getrating',getRating)
router.post('/createsubtitle/:courseid',createSubtitle)
router.post('/createvideo',createVideo)
router.post('/viewExam', viewExams)


module.exports = router