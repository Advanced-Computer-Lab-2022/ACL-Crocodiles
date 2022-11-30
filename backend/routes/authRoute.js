const express = require('express')
const {
    Signin,
    ForgotPassword,
    Resetpassword,
    ChangePassword

} = require('../controllers/authController')
const router = express.Router()

router.post('/login', Signin)

router.post('/forgotpassword',ForgotPassword)

router.put('/changepassword',ChangePassword)

router.put('/resetpassword/:id/:token',Resetpassword)
module.exports = router