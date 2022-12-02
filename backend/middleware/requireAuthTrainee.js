const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuthTrainee = async (req,res,next) => {



    const {authorization} = req.headers
    
    if(!authorization)
        return res.status(401).json({error:'authorization token required'})
    const token = authorization.split(' ')[1]
    
    try{
    const {_id} = jwt.verify(token,process.env.SECRET)
    
    const {Type} = await User.findOne({_id}).select('Type')
    if(Type !== 'Trainee' )
        return res.status(401).json({error:'Only Trainee can access'})
    
    req.user = await User.findOne({_id}).select('_id')
    
    next()
    
    }catch(error){
        console.log(error)
        res.status(401).json({error:'Request is  not authorized'})
    }
    
}
module.exports = requireAuthTrainee