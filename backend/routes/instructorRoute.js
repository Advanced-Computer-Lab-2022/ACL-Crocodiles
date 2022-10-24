const express = require('express')
const {
    createCourse,
    getCourse,
   // getCourses,
   // updateInstructor

} = require('../controllers/instructorController')

const router = express.Router()

router.post('/:id',createCourse)
//router.get('/filtersubjectprice/:id',getCourses1)
//router.get('/filtertitle/:id',getCourses2)
router.get('/:id',getCourse)
//router.put('/:id',updateInstructor)

module.exports = router