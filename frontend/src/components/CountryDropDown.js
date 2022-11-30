import { useState } from "react"
import CountryJSONArray from "../Country.json"
import CountryJSON2 from "../countries.json"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import CourseDetails from '../components/CourseDetails'
const Countries = [];
var Curr =""

for (let i = 0; i < CountryJSONArray.length; i++) {
    Countries.push(CountryJSONArray[i].country)
  }
 const x= async function(){
    const response = await fetch('https://v6.exchangerate-api.com/v6/fe81d930e9dce92c10f75c0c/latest/USD')
    const json = await response.json()
    return Object.entries(json.conversion_rates)
 }

  
const DropDown = (props)=>{


    const [Country, setCountry] = useState('');
    const [Currency, setCurrency] = useState('');
    const [Rate, setRate] = useState(1);
    const handleSubmit = async (e) =>{
        const  rates = await x()
        for(let i=0; i< CountryJSONArray.length; i++){
            if( CountryJSONArray[i].country==e.value){
                Curr = CountryJSONArray[i].currency_code
                setCurrency(CountryJSONArray[i].currency_code);
                console.log(Curr);
                
            }
        }
        console.log(rates.length)
        for(let i=0;i<rates.length;i++){
            console.log(rates[i][0])
            if(rates[i][0]==Curr){
                setRate(rates[i][1])
            }
        }
        console.log(rates)
    }
  
return (
    <div>
    <Dropdown options={Countries}  onChange={handleSubmit}   value={Country} placeholder="Select a country"/>
  <div> {props.courses && props.courses.map((course) =>(
        <CourseDetails course={course} currency={Curr} rate={Rate}/>
    ))}
    </div>
    </div>
)

}

export default DropDown