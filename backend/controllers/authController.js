const User = require('../models/userModel')
const Validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
var cid = null

const Signin = async (req, res) => {
    const { Email, Password } = req.body

    try {
        const user = await User.Login(Email, Password)
        const token = jwt.sign({ _id: user._id, Email: user.Email }, process.env.SECRET, { expiresIn: '3d' })
        res.status(200).json({ Email, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const ForgotPassword = async (req, res) => {
    const { Email } = req.body
    if (!Email)
        return res.status(400).json({ error: 'please enter email' })
    if (!Validator.isEmail(Email))
        return res.status(400).json({ error: 'Incorrect email format' })
    const user = await User.findOne({ Email })
    if (!user)
        return res.status(400).json({ error: 'No existing user' })
    const secret = process.env.SECRET + user.Password
    const token = jwt.sign({ _id: user._id, }, secret, { expiresIn: '5m' })
    const link = `http://localhost:4000/api/auth/resetpassword/${user._id}/${token}`
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'youssef.abdelatty@student.guc.edu.eg',
            pass: 'Oasis30011'
        }
    });

    var mailOptions = {
        from: 'youssef.abdelatty@student.guc.edu.eg',
        to: 'youssefbahei1@gmail.com',
        subject: 'Changing password',
        text: link
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const Resetpassword = async (req, res) => {
    const { id, token } = req.params
    const { Password } = req.body
    const user = await User.findOne({ _id: id })
    if (!user)
        return res.status(400).json({ error: 'No existing user' })
    cid = id
    const secret = process.env.SECRET + user.Password
    try {
        const verify = jwt.verify(token, secret)
        if (verify)
            res.redirect("http://localhost:3000/resetpassword")

    } catch (error) {

    }
}
const Resetpasswordput = async (req, res) => {
    const { Confirm, Password } = req.body
    if (!Password || !Confirm)
        return res.status(400).json({ error: 'enter new password' })
    if (Confirm !== Password)
        return res.status(400).json({ error: 'Passwords dont match' })
    if (!Validator.isStrongPassword(Password))
        return res.status(400).json({ error: 'weak password' })
    const salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(Password, salt)
    const user = await User.findByIdAndUpdate(cid, { Password: hash })
    if (user)
        res.status(200).json(user)




}
const ChangePassword = async (req, res) => {
    const { Email, OldPassword, NewPassword1, NewPassword2 } = req.body;
    try {
        const user = await User.ChangePass(Email, OldPassword, NewPassword1, NewPassword2);
        if (user)
            res.status(200)
        else
            throw Error('Failed')
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    Signin,
    ForgotPassword,
    Resetpassword,
    Resetpasswordput,
    ChangePassword
}