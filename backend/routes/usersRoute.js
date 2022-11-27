const express = require('express')
const {
    RegisterInstructor,
    RegisterTrainee

} = require('../controllers/usersController')
const router = express.Router()

router.post('/trainee', RegisterTrainee)
router.post('/instructor', RegisterInstructor)

module.exports = router