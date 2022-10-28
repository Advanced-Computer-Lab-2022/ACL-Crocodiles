const express = require('express')
const {
    createTrainee,
    getTrainee,
    getTrainees,
    deleteTrainee,
    updateTrainee,
    viewAllCourses,
    filterCoursePrice
} = require('../controllers/traineeController')
const router = express.Router()


router.get('/', getTrainees)

router.get('/:id',getTrainee)

router.post('/', createTrainee)

router.delete('/:id',deleteTrainee)

router.patch('/:id',updateTrainee)

router.get('/page/viewAllCourses', viewAllCourses)

router.get('/page/filterCourses',filterCoursePrice)




module.exports = router