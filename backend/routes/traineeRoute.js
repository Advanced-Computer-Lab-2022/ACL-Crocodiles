const express = require('express')
const requireAuthTrainee = require('../middleware/requireAuthTrainee')
const {
    createTrainee,
    getTrainee,
    getTrainees,
    deleteTrainee,
    updateTrainee,
    viewAllCourses,
    getSubtitles,
    viewExams,
    viewExam,
    getMyCourses,
    findCourse,
    findSub,
    getMyTrainee,
    getMyCourse,
    findSub2,
    rateCourse,
    rateInstructor,
    addAssignment,
    getAssignment,
    calculateGrade,
    getTraineeDetails
} = require('../controllers/traineeController')

const router = express.Router()

router.use(requireAuthTrainee)

router.get('/', getTrainees)

router.get('/:id', getTrainee)

router.post('/', createTrainee)

router.delete('/:id', deleteTrainee)

router.patch('/:id', updateTrainee)

router.get('/page/viewAllCourses', viewAllCourses)
router.get('/page/traineedetails', getTraineeDetails)

//router.get('/page/viewExams/:courseid', viewExams)


router.get('/page/viewExam/:examid', viewExam)

router.get('/page/MyCourses', getMyCourses)
router.get('/page/MyCourses/:id', findCourse)
router.get('/page/findSub/:id', findSub)
router.get('/page/getMyTrainee/', getMyTrainee)
router.get('/page/getMyCourse/:id', getMyCourse)
router.post('/subtitles', getSubtitles)
router.patch('/page/addAssignment', addAssignment)
router.post('/page/getAssignment', getAssignment)
router.post('/page/calculateGrade', calculateGrade)

router.get('/page/sub/', findSub2)
router.put('/page/rateCourse/:id', rateCourse)
router.put('/rateInstructor/:id', rateInstructor)




module.exports = router