const express = require('express')
const requireAuthInstructor = require('../middleware/requireAuthInstructor') 
const {
    createCourse,
    searchCourse,
    filterCourse,
    filterCoursePrice,
    Search,
    viewAllCourses,
    viewAllInsCourses,
    editBiographyorEmail,
    defineDiscount,
    getRating,
    createSubtitle,
    createVideo
} = require('../controllers/instructorController')


const router = express.Router()

router.use(requireAuthInstructor)
router.get('/viewAllinsCourses',viewAllInsCourses)
router.get('/viewAllCourses',viewAllCourses)
router.post('/createcourse', createCourse)
//router.get('/filtersubjectprice/:id',getCourses1)
router.post('/filter', filterCourse)
router.post('/getcoursebyid', searchCourse)
router.post('/filterbyprice', filterCoursePrice)
router.post('/search', Search)
router.put('/editbiographyoremail',editBiographyorEmail)
router.post('/definediscount/:courseid',defineDiscount),
router.get('/getrating',getRating)
router.post('/createsubtitle/:courseid',createSubtitle)
router.post('/createvideo',createVideo)


module.exports = router