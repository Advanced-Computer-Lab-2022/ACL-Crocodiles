const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Trainee = require('../models/traineeModel')
const Instructor = require('../models/instructorModel')
const bcrypt = require('bcrypt')
const Validator = require('validator')


const userSchema = new Schema({

  Email: {
    type: String,
    required: true,
    unique: true
  },
  Username: {
    type: String,
    require: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  Flag: {
    type: String,
    default: "true"
  },
}, { timestamps: true });


userSchema.statics.RegTrainee = async function (Username, Email, Password, Firstname, Lastname, Gender) {
  const Type = 'Trainee'
  if (!Email || !Password || !Username)
    throw Error('Must type email or password or username')
  if (!Validator.isEmail(Email))
    throw Error('incorrect email format')
  if (!Validator.isStrongPassword(Password))
    throw Error('weak pasword')

  let useru = await this.findOne({ Username })
  if (useru)
    throw Error('username already in use')
  let usere = await this.findOne({ Email })
  if (usere)
    throw Error('Email already in use')


  const salt = await bcrypt.genSalt(10)
  let hash = await bcrypt.hash(Password, salt)
  const user = await this.create({ Username, Email, Password: hash, Type })
  const trainee = await Trainee.create({ _id: user._id, Firstname: Firstname, Lastname: Lastname, Gender: Gender })
  if (!trainee)
    await this.delete({ _id: user._id })
  return trainee, user
}

userSchema.statics.Login = async function (Username, Password) {
  if (!Username || !Password)
    throw Error('Must type username or password')

  const user = await this.findOne({ Username })
  if (!user)
    throw Error('Incorrect username or password')

  const validpass = await bcrypt.compare(Password, user.Password)
  if (!validpass)
    throw Error('incorrect username or password')

  return user
}

userSchema.statics.ChangePass = async function (Username, OldPassword, NewPassword1, NewPassword2) {

  const user = await this.findOne({ Username })
  if (!user)
    throw Error('no such user')

  const validpass = await bcrypt.compare(OldPassword, user.Password)
  if (!validpass)
    throw Error('Old Password is incorrect')

  if (NewPassword1 !== NewPassword2)
    throw Error('New Password doesnt match')

  if (!Validator.isStrongPassword(NewPassword1))
    throw Error('Choose a strong password')

  const salt = await bcrypt.genSalt(10)
  let hash = await bcrypt.hash(NewPassword1, salt)
  let password = await this.findByIdAndUpdate(user._id, { Password: hash })

  return password
}



module.exports = mongoose.model('User', userSchema);