import React, { useState } from "react";
import Course from "../pages/Search";

const SearchCourses = () => {

    const {search, setSearch} = useState('')
    const {id, setID} = useState('')
    const {courses, setcourses} = useState('')
    const[error,setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {InstructorId} = JSON.stringify(id)
        const body = {search,InstructorId}
        const response = await fetch('/api/instructor/getcoursebyid', {method:'GET',body:JSON.stringify(body), Headers:{
            'content-type': 'application/json'
        }
        })
        const json = await response.json()
    if(!response.ok){
        setError(json.error)    
    }
    if (response.ok){
        setcourses(json)
        setSearch('')
        setID('')
        setError(null)
    }
    }

    return (
        <form className="searchcourse" onSubmit={handleSubmit}>
            <h3>Search Courses</h3>
            <input
                type = "text"
                placeholder="Title or Subject"
                onChange={(e) => setSearch(e.target.value)}
                value = {search}
            />
             <input
                type = "text"
                placeholder="Instructor ID"
                onChange={(e) => setID(e.target.value)}
                value = {id}
            />
            <button>Search</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SearchCourses