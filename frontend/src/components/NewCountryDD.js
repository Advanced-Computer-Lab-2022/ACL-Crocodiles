import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CountryJSONArray from '../countries.json'
import { useState } from "react"
import { useDispatch } from "react-redux";
import { chooseCountry } from "../Features/country";
const Countries = [];
var Curr = ""

for (let i = 0; i < CountryJSONArray.length; i++) {
    Countries.push(CountryJSONArray[i].country)
}
const x = async function () {
    const response = await fetch('https://v6.exchangerate-api.com/v6/fe81d930e9dce92c10f75c0c/latest/USD')
    const json = await response.json()
    return Object.entries(json.conversion_rates)
}


export default function NewCountryDD() {
    const dispatch = useDispatch();
    const [Country, setCountry] = useState('');
    const [Currency, setCurrency] = useState('');
    const [Rate, setRate] = useState(1);
    const handleSubmit = async (e) => {
      if(e){
        
        const rates = await x()
        for (let i = 0; i < CountryJSONArray.length; i++) {
            if (CountryJSONArray[i].country == e.country) {
                Curr = CountryJSONArray[i].currency_code
                
                setCurrency(CountryJSONArray[i].currency_code);
            

            }
        }
        let r = 0;
  
        for (let i = 0; i < rates.length; i++) {
      
            if (rates[i][0] == Curr) {
                setRate(rates[i][1])
                r = rates[i][1]
            }
        }
     
        dispatch(chooseCountry({ countryName: Country, rate: r, code: Curr }))
      }else{
        dispatch(chooseCountry({ countryName: Country, rate: 1, code: 'USD' }))
      }
    }

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 180 }}
      options={CountryJSONArray}
      color='secondary'
      autoHighlight
      onChange={(e,v) => handleSubmit(v)}
      getOptionLabel={(option) => option.country}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0  , fontSize:'0.5rem'} }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.countryCode.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.country}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          size="small"
          fontSize= {0.6}
          margin='dense'
          sx={{   fontSize: '0.5rem'}}
          inputProps={{
            fontSize: '0.5rem',
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

