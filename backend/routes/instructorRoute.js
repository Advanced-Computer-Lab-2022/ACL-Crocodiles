const express = require('express')
const requireAuthInstructor = require('../middleware/requireAuthInstructor')
const {
    createCourse,
    searchCourse,
    createExam,
    createQuestion,
    viewExams,
    viewAllInsCourses,
    editEmail,
    editBiography,
    defineDiscount,
    getRating,
    createSubtitle,
    createVideo,
    getInsDetails,
    setFlag,
    EditInstructorinfo,
    owedPermonth
    

  
} = require('../controllers/instructorController')


const router = express.Router()

router.use(requireAuthInstructor)
router.get('/viewAllinsCourses', viewAllInsCourses)
//router.get('/viewAllCourses',viewAllCourses)
router.post('/createcourse', createCourse)
//router.post('/createexam/:courseid', createExam)
router.post('/createexam', createExam)
router.post('/createquestion', createQuestion)
router.get('/insdetails',getInsDetails)
//router.get('/filtersubjectprice/:id',getCourses1)
router.post('/editinsinfo', EditInstructorinfo)
router.post('/getcoursebyid', searchCourse)
router.post('/setflag', setFlag)
//router.post('/search', Search)
router.get('/owedpermonth', owedPermonth)
router.post('/viewExam', viewExams)
router.put('/editemail', editEmail)
router.put('/editbiography', editBiography)
router.post('/definediscount/:courseid', defineDiscount),
router.get('/getrating', getRating)
router.post('/createsubtitle/:courseid', createSubtitle)
router.post('/createvideo', createVideo)


module.exports = router