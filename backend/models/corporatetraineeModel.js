const mongoose = require('mongoose')
const Schema = mongoose.Schema

const corporatetraineeSchema = new Schema({
    Email: {
      type: String,
      required: true
    },
    Password: {
      type:String,
      required: true
    }
    }, { timestamps: true })

  
  module.exports = mongoose.model('CorporateTrainee', corporatetraineeSchema);
 
