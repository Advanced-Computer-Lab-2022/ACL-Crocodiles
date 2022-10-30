import CourseDetails from '../components/CourseDetails'
import Dropdown from 'react-dropdown';
import React, { useState,useEffect } from "react";
import 'react-dropdown/style.css';
var curr = ""

const Country =  (props) => {
    
    const fetchCountries = async () => {
        const response = await fetch('/api/country/allCountries')
        const json = await response.json()
        
        return json
    }
    const f = async function(){
        const allCountries = await fetchCountries();
        const categories = [];
    for (var i in allCountries) {
        categories.push(allCountries[i].country);
  
    } 
   return categories;
    }
  
   const x= f().then(function(result) {
    Dropdown.options=result})
   

    const[Country,setCountry] = useState('')
    const[Val,setVal] = useState(0)
    const[error,setError] = useState(null)
   
    const handleSubmit = async (e) =>{

        const response =  await fetch('/api/country/',{method:'POST',body:JSON.stringify({country:e.value}),headers: {
            'content-type':'application/json'
        }
      })
   
      const json = await response.json()
      if(!response.ok){
          setError(json.error)    
      }
      if (response.ok){
          setCountry('')
          setError(null)
          setVal(Val+1)
          props.onsubmit(json[0].currency_code);
          curr = json[0].currency_code
         }
         
        }
     

    return ( 
       
    <div>
        <div>
      <Dropdown options={Dropdown.options || ['Loading...']}  onChange={handleSubmit}   value={Country} placeholder="Select a country"/>
      </div>
      <div>
      {props.courses && props.courses.map((course) =>(
                <CourseDetails course={course} currency={curr}/>
            ))}
            
   
            </div>
        </div>
    )
}

export default Country
