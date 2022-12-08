const express = require('express')
// const requireAuth = require('../middleware/requireAuthAdmin')
// const requireAuthcorpTrainee = require('../middleware/requireAuthcorpTrainee')

const {
    viewAllCourses,
    searchCourse,
    getMyCourses,
    findCourse,
    addAssignment,
    getAssignment,
    calculateGrade,
    viewExam
} = require('../controllers/corporatetraineeController')


const router = express.Router()

// router.use(requireAuthTrainee)
router.get('/viewall',viewAllCourses)
router.get('/searchall',searchCourse)
router.get('/page/MyCourses',getMyCourses)
router.get('/page/MyCourses/:id',findCourse)
router.patch('/page/addAssignment',addAssignment)
router.post('/page/getAssignment',getAssignment)
router.post('/page/calculateGrade',calculateGrade)
router.get('/page/viewExam/:examid', viewExam)
module.exports = router










module.exports = router