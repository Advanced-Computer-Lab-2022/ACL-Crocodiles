const express = require('express')
const requireAuthAdmin = require('../middleware/requireAuthAdmin')
const  {
   createAdmin,
   createInstructor,
   createCorporateTrainee,
   setPromotion,
   setPromotionAllCourses,
   getPendingCourseRequests,
   grantCourseAccess,
   denyCourseAccess
} = require('../controllers/adminController')

const router = express.Router()

//router.use(requireAuthAdmin)

router.post('/createadmin',createAdmin)

router.post('/createinstructor',createInstructor)

router.post('/createcorporatetrainee',createCorporateTrainee)

router.put('/setpromotion',setPromotion)

router.get('/getpendingcourserequests',getPendingCourseRequests)

router.post('/setpromotionallcourses',setPromotionAllCourses)

router.post('/grantcourseaccess',grantCourseAccess)

router.post('/denycourseaccess',denyCourseAccess)
module.exports = router