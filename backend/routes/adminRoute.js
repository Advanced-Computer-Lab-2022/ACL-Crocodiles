const express = require('express')
const requireAuthAdmin = require('../middleware/requireAuthAdmin')
const  {
   createAdmin,
   createInstructor,
   createCorporateTrainee
} = require('../controllers/adminController')

const router = express.Router()

//router.use(requireAuthAdmin)

router.post('/createadmin',createAdmin)

router.post('/createinstructor',createInstructor)

router.post('/createcorporatetrainee',createCorporateTrainee)
module.exports = router