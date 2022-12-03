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
    editBiographyorEmail

} = require('../controllers/instructorController')


const router = express.Router()

router.use(requireAuthInstructor)
router.get('/viewAllinsCourses',viewAllInsCourses)
//router.get('/viewAllCourses',viewAllCourses)
router.post('/createcourse', createCourse)
//router.get('/filtersubjectprice/:id',getCourses1)

router.post('/getcoursebyid', searchCourse)

//router.post('/search', Search)
router.put('/editbiographyoremail',editBiographyorEmail)

module.exports = router