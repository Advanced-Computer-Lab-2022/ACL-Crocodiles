const express = require('express')
const {
    RegisterInstructor,
    RegisterTrainee

} = require('../controllers/usersController')
const router = express.Router()

router.post('/trainee', RegisterTrainee)


module.exports = router