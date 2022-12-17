const express = require('express')
const requireAuthAdmin = require('../middleware/requireAuthAdmin')
const  {
   createAdmin,
   createInstructor,
   createCorporateTrainee,
   setPromotion,
   setPromotionAllCourses
} = require('../controllers/adminController')

const router = express.Router()

//router.use(requireAuthAdmin)

router.post('/createadmin',createAdmin)

router.post('/createinstructor',createInstructor)

router.post('/createcorporatetrainee',createCorporateTrainee)

router.post('/setpromotion',setPromotion)

router.post('/setpromotionallcourses',setPromotionAllCourses)
module.exports = router