const express = require('express')
const {
    createTrainee,
    getTrainee,
    getTrainees,
    deleteTrainee,
    updateTrainee,
    viewAllCourses,
    getSubtitles,
    viewExams,
    viewExam
} = require('../controllers/traineeController')
const router = express.Router()


router.get('/', getTrainees)

router.get('/:id', getTrainee)

router.post('/', createTrainee)

router.delete('/:id', deleteTrainee)

router.patch('/:id', updateTrainee)

router.get('/page/viewAllCourses', viewAllCourses)

router.get('/page/viewExams', viewExams)

router.get('/page/viewExam', viewExam)

router.post('/subtitles', getSubtitles)




module.exports = router