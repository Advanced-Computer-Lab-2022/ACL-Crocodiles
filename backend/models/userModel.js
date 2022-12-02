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
      unique:true
    },
    Username:{
      type: String,
      require: false,
      unique: true
    },
    Password: {
      type:String,
      required: true
    },
    Type :{
      type:String,
      required:true
    }}, { timestamps: true });


  userSchema.statics.RegInstructor = async function(Email,Password,Firstname,Lastname){
    const Type = 'Instructor'
    if(!Email || !Password)
        throw Error('Must type email or password')
    if(!Validator.isEmail(Email))
        throw Error('incorrect email format')
    if(!Validator.isStrongPassword(Password))
        throw Error('weak pasword')

    let user = await this.findOne({Email})
        if (user)
           throw Error('Email already in use')
           
    const salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(Password,salt)
    user = await this.create({Email,Password:hash,Type})
    const instructor =  await Instructor.create({_id:user._id,Firstname:Firstname,Lastname:Lastname})
    return instructor
  }

  userSchema.statics.RegTrainee = async function(Email,Password,Firstname,Lastname){
    const Type = 'Trainee'
    if(!Email || !Password)
        throw Error('Must type email or password')
    if(!Validator.isEmail(Email))
        throw Error('incorrect email format')
    if(!Validator.isStrongPassword(Password))
        throw Error('weak pasword')

    let user = await this.findOne({Email})
        if (user)
           throw Error('Email already in use')

    const salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(Password,salt)
    user = await this.create({Email,Password:hash,Type})
    const trainee =  await Trainee.create({_id:user._id,Firstname:Firstname,Lastname:Lastname})
    if(!trainee)
      await this.delete({_id:user._id})
    return trainee
  }

  userSchema.statics.Login = async function(Email,Password){
    if(!Email || !Password)
        throw Error('Must type email or password')

    const user = await this.findOne({Email})
      if (!user)
        throw Error ('Incorrect email or password')

      const validpass = await bcrypt.compare(Password,user.Password)
      if(!validpass)
        throw Error('incorrect email or password')
      
      return user
    }

    userSchema.statics.ChangePass = async function(Email,OldPassword,NewPassword1,NewPassword2){
      const user = await this.findOne({Email})
      if (!user)
        throw Error ('no such user')
      const validpass = await bcrypt.compare(OldPassword,user.Password)
      if(!validpass)
          throw Error('Old Password is incorrect')
      else {
        if (NewPassword1 === NewPassword2){
          const salt = await bcrypt.genSalt(10)
          let hash = await bcrypt.hash(NewPassword1,salt)
          user = await this.update({Password:hash})
        }
        else
          throw Error('New Password doesnt match')
      }
      return true;
    }
    


    module.exports = mongoose.model('User', userSchema);