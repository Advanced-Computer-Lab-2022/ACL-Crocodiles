const User = require('../models/userModel')
const Validator = require('validator')
const jwt =  require('jsonwebtoken')
const Signin = async (req,res) => {
    const {Email,Password} = req.body
        
    try{
        const user = await User.Login(Email,Password)
        const token = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:'3d'})
        res.status(200).json({Email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
const ForgotPassword = async(req,res) => {
    const {Email} = req.body
    if(!Email )
        return res.status(400).json({error:'please enter email'})
    if(!Validator.isEmail(Email))
        return res.status(400).json({error:'Incorrect email format'})
    const user = await User.findOne({Email})
    if (!user)
        return res.status(400).json({error:'No existing user'})
    const secret = process.env.SECRET + user.Password
    const token = jwt.sign({_id:user._id,},secret,{expiresIn:'5m'})
    const link = `http://localhost:3000/api/auth/resetpassword/${user._id}/${token}`
    console.log(link)
   }

const Resetpassword = async(req,res) => {
    const{id,token} =req.params
    const user = await User.findOne({_id:id})
    if(!user)
        return res.status(400).json({error:'No existing user'})
    if(!Validator.isStrongPassword(Password))
        return res.status(400).json({error:'Weak Password'})
    const secret = process.env.SECRET + user.Password
    try{
    const verify = jwt.verify(token,secret)
    res.render('ForgotPassword')
    const newuser = await User.findByIdAndUpdate(id,{Password:Password})
    }
    catch(error){

    }
    
}
const ChangePassword = async (req,res) => {
    const{Email,OldPassword,NewPassword1,NewPassword2} = req.body;
    try {
        const user = await User.ChangePass(Email,OldPassword,NewPassword1,NewPassword2);
        if (user)
            res.status(200)
        else
            throw Error('Failed')
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


module.exports = {
   Signin,
   ForgotPassword,
   Resetpassword,
   ChangePassword
}