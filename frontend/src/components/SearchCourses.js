import React, { useState } from "react";
import SearchDetails from '../components/SearchDetails'

const SearchCourses = () => {

    const [Title, setTitle] = useState('')
    const [Subject, setSubject] = useState('')
    const [courses, setCourses] = useState(null)
    const[error,setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {Title, Subject}
        console.log(body)
        const response = await fetch('/api/instructor/getcoursebyid', {method:'POST',body:JSON.stringify(body), headers:{
            'content-type': 'application/json'
        }
        })
        const json = await response.json()
    if(!response.ok){
        setError(json.error)    
    }
    if (response.ok){
        setCourses(json)
        setTitle('')
        setSubject('')
        setError(null)
    }
    }

    return (
        <form className="searchcourse" onSubmit={handleSubmit}>
            <h3>Search Courses</h3>
            <input
                type = "text"
                placeholder="Search by Title or Subject"
                onChange={(e) => setTitle(e.target.value) || setSubject(e.target.value) }
                value = {Title || Subject}
            />
            <button>Search</button>
            {error && <div className="error">{error}</div>}
            {courses && courses.map((course) =>(
                    <SearchDetails key={course._id} course={course}/>
                ))}
        </form>
    )
}

export default SearchCourses