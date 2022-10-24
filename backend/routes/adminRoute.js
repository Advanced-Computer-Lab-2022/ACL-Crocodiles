const express = require('express')

const  {
   createAdmin,
   createTrainee,
   createInstructor
} = require('../controllers/adminController')
const router = express.Router()

router.post('/',createAdmin)

router.post('/',createTrainee)
router.post('/createinstructor',createInstructor)

module.exports = router