const express = require('express')
const requireAuthTrainee = require('../middleware/requireAuthTrainee')
const {
    createTrainee,
    getTrainee,
    getTrainees,
    deleteTrainee,
    updateTrainee,
    viewAllCourses,
    getSubtitles
} = require('../controllers/traineeController')

const router = express.Router()

//router.use(requireAuthTrainee)

router.get('/', getTrainees)

router.get('/:id',getTrainee)

router.post('/', createTrainee)

router.delete('/:id',deleteTrainee)

router.patch('/:id',updateTrainee)

router.get('/page/viewAllCourses', viewAllCourses)

router.post('/subtitles', getSubtitles)




module.exports = router