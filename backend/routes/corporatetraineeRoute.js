const express = require('express')
const requireAuth = require('../middleware/requireAuthAdmin')

const {
    viewAllCourses,
    searchCourse,
  
  

} = require('../controllers/corporatetraineeController')

const router = express.Router()

router.get('/viewall',viewAllCourses)
router.get('/searchall',searchCourse)

module.exports = router