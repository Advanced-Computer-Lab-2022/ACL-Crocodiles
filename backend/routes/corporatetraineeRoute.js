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










module.exports = router