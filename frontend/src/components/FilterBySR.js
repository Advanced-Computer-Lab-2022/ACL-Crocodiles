import React, { useState } from "react";
import CourseDetails from './CourseDetails'
import { useAuthContext } from "../hooks/useAuthContext";


const FilterBySR = () => {
    
    const [Rating, setRating] = useState(0)
    const [Subject, setSubject] = useState("")
    const [courses, setCourses] = useState('')
    const [error, setError] = useState(null)
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = { Subject,Rating }
        console.log(body)
        const response = await fetch('/api/guest/filterbysr', {
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
            //setRating(0)
            setError(null)
        }


    }

    return (<form className="filtercourse" onSubmit={handleSubmit} >
            <h5>Filter Subject</h5>
            <select  value ={Subject} onChange={(e) =>  setSubject(e.target.value)} >
            <option value="">--Please select a subject--</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Economics">Economics</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            </select>
            <input
            type="number"
            onChange={(e) => setRating(e.target.value)}
            value={Rating}
        />
            <button>Filter</button>
            {error && <div className="error">{error}</div>}
            {courses && courses.map((course) =>(
                    <CourseDetails key={course._id} course={course}/>
                ))}
               
    </form>)




}

{
   
}

export default FilterBySR