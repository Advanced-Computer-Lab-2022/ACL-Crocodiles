import React, { useState } from "react";
import SearchDetails from './SearchDetails'
import CountryJSONArray from "../Country.json"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import CourseDetails from '../components/CourseDetails'
const Countries = [];
var Curr =""

for (let i = 0; i < CountryJSONArray.length; i++) {
    Countries.push(CountryJSONArray[i].country)
  }
  

const Search = () => {
    
    const [Title, setTitle] = useState('')
    const [Subject, setSubject] = useState('')
    const [Username, setUsername] = useState('')
    const [courses, setCourses] = useState('')
    const [error, setError] = useState(null)
    const [Country, setCountry] = useState('');
    const [Currency, setCurrency] = useState('');
  
        const handleCountry = async (e) => {
        for(let i=0; i< CountryJSONArray.length; i++){
            if( CountryJSONArray[i].country==e.value){
                Curr = CountryJSONArray[i].currency_code
                setCurrency(CountryJSONArray[i].currency_code);
                console.log(Curr);
                return;
            }
        }
        }
    



    const handleSubmit = async () => {
       
        const body = { Title,Subject,Username }
        console.log(body)
        const response = await fetch('/api/instructor/search', {
            method: 'POST', body: JSON.stringify(body), headers: {
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
                    <SearchDetails key={course._id} course={course} currency={Curr}/>
                ))}
                </div>
        )}
export default Search