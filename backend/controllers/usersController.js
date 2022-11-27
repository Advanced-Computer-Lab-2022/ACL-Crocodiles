const User = require('../models/userModel')
const jwt =  require('jsonwebtoken')



const RegisterInstructor = async (req,res) => {
    const {Email,Password,Firstname,Lastname} = req.body
    try{
        const user = await User.RegInstructor(Email,Password,Firstname,Lastname)
        const token = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:'3d'})
        res.status(200).json({Email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}  
const RegisterTrainee = async (req,res) => {
    const {Email,Password,Firstname,Lastname} = req.body
    try{
        const user = await User.RegTrainee(Email,Password,Firstname,Lastname)
        const token = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:'3d'})
        res.status(200).json({Email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
} 
module.exports = {
    RegisterInstructor,
    RegisterTrainee,
}