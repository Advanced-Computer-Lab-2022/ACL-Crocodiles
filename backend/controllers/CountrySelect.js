const Country = require('../models/countryModel')
const mongoose = require('mongoose')


const CurrencySearch = async (req,res) => {
    try{
    const currencySearch = await Country.find(req.body)
    if(!currencySearch){
        return res.status(404).json({error: 'no such Country'})
    }
    res.status(200).json(currencySearch)
    } catch(error){
    res.status(400).json({error: 'no country found'})
    }
}

const allCountries = async (req,res) => {
    try {
        const countries = await Country.find()
        if(!countries){
            return res.status(404).json({error: 'no courses found'})
        }
            res.status(200).json(countries)
        
     } catch (error) {
       res.status(400).json({error: 'error'})
     }
}
module.exports = {
    CurrencySearch,allCountries
}
