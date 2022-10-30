import React, { useState } from "react";
import SearchDetails from './SearchDetails'


const Search = () => {
    
    const [Title, setTitle] = useState('')
    const [Subject, setSubject] = useState('')
    const [Username, setUsername] = useState('')
    const [courses, setCourses] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
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
        <form className="search" onSubmit={handleSubmit}>
            <h3>Search Courses</h3>
            <input
                type = "text"
                placeholder="Search "
                onChange={(e) => setTitle(e.target.value) || setSubject(e.target.value) || setUsername(e.target.value)}
                value = {Title || Subject || Username}
                />
                <button>Search</button>
            {error && <div className="error">{error}</div>}
            {courses && courses.map((course) =>(
                    <SearchDetails key={course._id} course={course}/>
                ))}
                </form>
        )}
export default Search