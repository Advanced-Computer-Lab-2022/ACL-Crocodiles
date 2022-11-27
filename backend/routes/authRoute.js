const express = require('express')
const {
    Signin

} = require('../controllers/authController')
const router = express.Router()

router.post('/login', Signin)


module.exports = router