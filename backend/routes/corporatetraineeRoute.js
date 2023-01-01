const express = require('express')
const requireAuthCorporate = require('../middleware/requireAuthCorporate')

const {
    viewAllCourses,
    searchCourse,
    getMyCourses,
    findCourse,
    addAssignment,
    getAssignment,
    calculateGrade,
    viewExam,
    requestCourse,
    checkRequested,
    getMyCoursesLimited,
    reportProblem,
    getCorporateTrainee,
    rateCourse,
    rateInstructor,
    checkRatingCorp,
    checkRatingCorpInstructor,
    setFlag,
    EditCorpinfo,
    getFlag
} = require('../controllers/corporatetraineeController')


const router = express.Router()

router.use(requireAuthCorporate)
router.get('/viewall',viewAllCourses)
router.get('/searchall',searchCourse)
router.get('/page/MyCourses',getMyCourses)
router.get('/page/MyCourses/:id',findCourse)
router.patch('/page/addAssignment',addAssignment)
router.post('/page/getAssignment',getAssignment)
router.post('/page/calculateGrade',calculateGrade)
router.get('/page/viewExam/:examid', viewExam)
router.post('/page/requestCourse', requestCourse)
router.get('/page/checkRequested/:CourseID', checkRequested)
router.get('/page/getMyCoursesLimited', getMyCoursesLimited)
router.post('/page/reportProblem', reportProblem)
router.get('/page',getCorporateTrainee)
router.post('/page/rateCourse', rateCourse)
router.post('/page/rateInstructor', rateInstructor)
router.post('/page/setflag',setFlag)
router.get('/page/getflag',getFlag)
router.post('/page/editcorpinfo',EditCorpinfo)
router.get('/page/checkRatingTrainee/:courseID', checkRatingCorp)
router.get('/page/checkRatingTraineeInstructor/:instructorID', checkRatingCorpInstructor)










module.exports = router