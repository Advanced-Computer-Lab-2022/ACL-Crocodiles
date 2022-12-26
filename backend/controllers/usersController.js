const User = require('../models/userModel')
const jwt =  require('jsonwebtoken')



const RegisterTrainee = async (req,res) => {
    const {Username,Email,Password,Firstname,Lastname,Gender} = req.body
    console.log(req.body)
    try{
        console.log('try')
        const user = await User.RegTrainee(Username,Email,Password,Firstname,Lastname,Gender)
        console.log(user)
        id = user._id
        const token = jwt.sign({ _id: user._id, Username: user.Username, My_Courses:user.My_Courses }, process.env.SECRET, { expiresIn: '3d' })
        res.status(200).json({Username,token, Type:user.Type})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}



module.exports = {
    RegisterTrainee,
}