const express = require('express')

const {
    createCourse,
    searchCourse,
    filterCourse,
   // updateInstructor

} = require('../controllers/instructorController')

const router = express.Router()

router.post('/:id',createCourse)
//router.get('/filtersubjectprice/:id',getCourses1)
/router.get('/filter/:id',filterCourse)
router.get('/:id',searchCourse)
//router.put('/:id',updateInstructor)

module.exports = router