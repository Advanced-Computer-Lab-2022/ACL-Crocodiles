const express = require('express')
const {
    Signin,
    ForgotPassword,
    Resetpassword,
    ChangePassword,
    Resetpasswordput

} = require('../controllers/authController')
const router = express.Router()

router.post('/login', Signin)

router.post('/forgotpassword',ForgotPassword)

router.put('/changepassword',ChangePassword)

router.get('/resetpassword/:id/:token',Resetpassword)

router.post('/resetpassword/',Resetpasswordput)
module.exports = router