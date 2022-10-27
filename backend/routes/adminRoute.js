const express = require('express')

const  {
   createAdmin,
   createTrainee,
   createInstructor,
   createCorporateTrainee
} = require('../controllers/adminController')
const router = express.Router()

router.post('/createadmin',createAdmin)
router.post('/createtrainee',createTrainee)
router.post('/createinstructor',createInstructor)
router.post('/createcorporatetrainee',createCorporateTrainee)
module.exports = router