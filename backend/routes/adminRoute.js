const express = require('express')

const  {
   createAdmin,
   createTrainee,
   createInstructor
} = require('../controllers/adminController')
const router = express.Router()

router.post('/createadmin',createAdmin)
router.post('/createadmin',createTrainee)
router.post('/createinstructor',createInstructor)

module.exports = router