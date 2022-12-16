import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SearchDetails from './SearchDetails'
import CountryJSONArray from "../Country.json"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import CourseDetails from '../components/CourseDetails'
import { chooseCountry } from "../Features/country";
import { useAuthContext } from "../hooks/useAuthContext";


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


const Search = () => {
    const dispatch = useDispatch();
    const [Title, setTitle] = useState('')
    const [Subject, setSubject] = useState('')
    const [Username, setUsername] = useState('')
    const [courses, setCourses] = useState('')
    const [error, setError] = useState(null)
    const [Country, setCountry] = useState('');
    const [Currency, setCurrency] = useState('');
    const [Rate, setRate] = useState(1);
    const{user} = useAuthContext()

        const handleCountry = async (e) => {
            const  rates = await x()

        for(let i=0; i< CountryJSONArray.length; i++){
            if( CountryJSONArray[i].country==e.value){
                Curr = CountryJSONArray[i].currency_code
                setCurrency(CountryJSONArray[i].currency_code);
                console.log(Curr);
            
            }
        }
        for(let i=0;i<rates.length;i++){
            console.log(rates[i][0])
            if(rates[i][0]==Curr){
                console.log('gi')
                setRate(rates[i][1])
                dispatch(chooseCountry({countryName: Country, rate:rates[i][1], code:Curr}))
            }
        }
  
        }




    const handleSubmit = async () => {
        const body = { Title,Subject,Username }
        console.log(body)
        const response = await fetch('/api/guest/search', {
            method: 'POST', body: JSON.stringify(body), headers: {
                'Authorization': `Bearer ${user.token}`,
                'content-type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setCourses(json)
            setSubject("")
            setTitle("")
            setUsername("")
            setError(null)
        }

       
    }
    return(
        <div className="search" >
            <h3>Search Courses</h3>
           
            <Dropdown options={Countries}  onChange={handleCountry}   value={Country} placeholder="Select a country"/>
            <input
                type = "text"
                placeholder="Search "
                onChange={(e) => setTitle(e.target.value) || setSubject(e.target.value) || setUsername(e.target.value)}
                value = {Title || Subject || Username}
                />
                <button onClick={handleSubmit}>Search</button>
            {error && <div className="error">{error}</div>}
            {courses && courses.map((course) =>(
                    <SearchDetails key={course._id} course={course} currency={Curr} rate={Rate}/>
                ))}
                </div>
        )}
export default Search