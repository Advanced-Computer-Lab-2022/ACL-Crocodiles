const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = new Schema({
    country:{
        type:String,
        required:true
      },
      currency_code:{
        type:String,
        required:true
      },
   })

module.exports = mongoose.model('Country',countrySchema)