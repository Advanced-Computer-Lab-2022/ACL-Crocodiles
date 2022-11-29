const express = require('express')

const {
    createCourse,
    searchCourse,
    filterCourse,
    filterCoursePrice,
    Search,
    definePromotion,
    definePromotionTime,
    // updateInstructor

} = require('../controllers/instructorController')

const router = express.Router()

router.post('/createcourse', createCourse)
//router.get('/filtersubjectprice/:id',getCourses1)
router.post('/filter', filterCourse)
router.post('/getcoursebyid', searchCourse)
router.post('/filterbyprice', filterCoursePrice)
router.post('/search', Search)
router.post('/definepromotion', definePromotion)
router.post('/definepromotiontime', definePromotionTime)
//router.put('/:id',updateInstructor)


module.exports = router