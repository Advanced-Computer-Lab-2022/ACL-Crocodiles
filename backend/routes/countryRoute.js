const express = require('express')
const router = express.Router()
const  {CurrencySearch,allCountries} = require('../controllers/CountrySelect')



router.post('/',CurrencySearch)
router.get('/allCountries', allCountries)

module.exports = router