const express = require('express')
const {
    createTrainee,
    getTrainee,
    getTrainees,
    deleteTrainee,
    updateTrainee,
    viewAllCourses,
    filterCoursePrice,
    filterCourseSubjectRating
} = require('../controllers/traineeController')
const router = express.Router()


router.get('/', getTrainees)

router.get('/:id',getTrainee)

router.post('/', createTrainee)

router.delete('/:id',deleteTrainee)

router.patch('/:id',updateTrainee)

router.get('/page/viewAllCourses', viewAllCourses)

router.post('/page/filterCoursesPrice',filterCoursePrice)

router.post('/page/filterCoursesSR',filterCourseSubjectRating)




module.exports = router