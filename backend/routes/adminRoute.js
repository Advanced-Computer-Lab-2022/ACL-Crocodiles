const express = require('express')
const requireAuthAdmin = require('../middleware/requireAuthAdmin')
const {
   createAdmin,
   createInstructor,
   createCorporateTrainee,
   setPromotion,
   setPromotionAllCourses,
   getPendingCourseRequests,
   getPendingRefundRequests,
   grantCourseAccess,
   denyCourseAccess,
   grantRefund,
   denyRefund,
   viewAllProblems
} = require('../controllers/adminController')

const router = express.Router()

//router.use(requireAuthAdmin)

router.post('/createadmin', createAdmin)

router.post('/createinstructor', createInstructor)

router.post('/createcorporatetrainee', createCorporateTrainee)

router.put('/setpromotion', setPromotion)

router.get('/getpendingcourserequests', getPendingCourseRequests)
router.get('/problems', viewAllProblems)

router.get('/getpendingrefundrequests', getPendingRefundRequests)

//router.post('/setpendingcourserequests',setPendingRefundRequests)
router.post('/grantrefund', grantRefund)

router.post('/setpromotionallcourses', setPromotionAllCourses)

router.post('/grantcourseaccess', grantCourseAccess)

router.post('/denycourseaccess', denyCourseAccess)

router.post('/denyrefund', denyRefund)

module.exports = router