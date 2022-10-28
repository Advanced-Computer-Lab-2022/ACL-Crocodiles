import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector() {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = e => {
    setValue(e.target.value)
  }
  console.log(value.value);
  return <Select options={options} value={value} onChange={changeHandler}>   
   <option> disabled={true} value=" --Choose and option--" </option> 
</Select>
}

export default CountrySelector