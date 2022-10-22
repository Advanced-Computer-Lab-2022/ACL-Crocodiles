const express = require('express')

const  {
   createAdmin,
   createTrainee
} = require('../controllers/adminController')
const router = express.Router()

router.post('/',createAdmin)

router.post('/',createTrainee)

module.exports = router