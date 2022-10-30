import React, { useState } from "react";
import SearchDetails from '../components/SearchDetails'

const SearchCourses = () => {

    const [Title, setTitle] = useState('')
    const [Subject, setSubject] = useState('')
    const [id, setID] = useState('')
    const [courses, setCourses] = useState(null)
    const[error,setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        var body
        if (Title.length === 0 && Subject.length !== 0)
            body = {Subject,"InstructorId":{id:id}}
        else if (Subject.length === 0 && Title.length !== 0)
            body = {Title,"InstructorId":{id:id}}
        else
            body = {"InstructorId":{id:id}}
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
        setID('')
        setError(null)
    }
    }

    return (
        <form className="searchcourse" onSubmit={handleSubmit}>
            <h3>Search Courses</h3>
            <input
                type = "text"
                placeholder="Search by Title"
                onChange={(e) => setTitle(e.target.value)}
                value = {Title}
            />
            <h5>Or</h5>
            <input
                type = "text"
                placeholder="Search by Subject"
                onChange={(e) => setSubject(e.target.value)}
                value = {Subject}
            />
             <input
                type = "text"
                placeholder="Instructor ID"
                onChange={(e) => setID(e.target.value)}
                value = {id}
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