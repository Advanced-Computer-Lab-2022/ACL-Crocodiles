const express = require('express')
const {
    createTrainee,
    getTrainee,
    getTrainees,
    deleteTrainee,
    updateTrainee,
    viewAllCourses,
    getSubtitles,
    getMyCourses,
    findCourse,
    findSub
} = require('../controllers/traineeController')
const router = express.Router()


router.get('/', getTrainees)

router.get('/:id',getTrainee)

router.post('/', createTrainee)

router.delete('/:id',deleteTrainee)

router.patch('/:id',updateTrainee)

router.get('/page/viewAllCourses', viewAllCourses)

router.get('/page/MyCourses',getMyCourses)
router.get('/page/MyCourses/:id',findCourse)
router.get('/page/findSub/:id',findSub)

router.post('/subtitles', getSubtitles)




module.exports = router