const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



const RegisterTrainee = async (req, res) => {
    const { Username, Email, Password, Firstname, Lastname, Gender } = req.body
    try {
        const user = await User.RegTrainee(Username, Email, Password, Firstname, Lastname, Gender)
        id = user._id
        const token = jwt.sign({ _id: user._id, Username: user.Username }, process.env.SECRET, { expiresIn: '3d' })
        res.status(200).json({ Username, token, Type: user.Type })
        console.log(user.Type)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}



module.exports = {
    RegisterTrainee,
}