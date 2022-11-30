const express = require('express')
const requireAuthTrainee = require('../middleware/requireAuthTrainee')
const {
    viewAllCourses
 
} = require('../controllers/guestController')

const router = express.Router()

router.get('/viewAllCourses',viewAllCourses)

module.exports = router