import CountryJSONArray from "../Country.json"
import { useState } from "react"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import CourseDetails from '../components/CourseDetails'
const Countries = [];
var Curr =""

for (let i = 0; i < CountryJSONArray.length; i++) {
    Countries.push(CountryJSONArray[i].country)
  }
  
const DropDown = (props)=>{
    const [Country, setCountry] = useState('');
    const [Currency, setCurrency] = useState('');
    const handleSubmit = async (e) =>{

        for(let i=0; i< CountryJSONArray.length; i++){
            if( CountryJSONArray[i].country==e.value){
                Curr = CountryJSONArray[i].currency_code
                setCurrency(CountryJSONArray[i].currency_code);
                console.log(Curr);
                return;
            }
        }
    
    }
  
return (
    <div>
    <Dropdown options={Countries}  onChange={handleSubmit}   value={Country} placeholder="Select a country"/>
  <div> {props.courses && props.courses.map((course) =>(
        <CourseDetails course={course} currency={Curr}/>
    ))}
    </div>
    </div>
)

}

export default DropDown