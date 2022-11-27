const User = require('../models/userModel')

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
module.exports = {
   Signin
}