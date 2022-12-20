import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const NewCourseForm = () => {
    const {user} = useAuthContext()
    const[Title,setTitle] = useState('')
    const[Subject,setSubject] = useState('')
    const[Price,setPrice] = useState('')
    const[Summary,setSummary] = useState('')
    const[error,setError] = useState(null)
    const[success,setSuccess] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!user){
            setError('You must be logged in')
            return
        }
        const course = {Title,Subject,Price,Summary}
        console.log(JSON.stringify(course))
        const response =  await fetch('/api/instructor/createcourse',{method:'POST',body:JSON.stringify(course),headers: {
            'content-type':'application/json',
            'Authorization': `Bearer ${user.token}`
            
        }
      })
      const json = await response.json()
    if(!response.ok){
        setError(json.error)    
    }
    if (response.ok){
        setTitle('')
        setSubject('')
        setPrice('')
        setSummary('')
        //setID('')
       // setId('')
       setSuccess('Course added successfully')
        setError(null)
        console.log('new course added', json)
    }
    }
    

    return(
        
        <form  className="createcourse" onSubmit={handleSubmit}>
            <h3>Add a new Course</h3>
            <label>Course title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={Title}
            />
            <label>Course Subject:</label>
            <input
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                value={Subject}
            />
            <label>Course Price:</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={Price}
            />
            <label>Course Summary:</label>
            <input
                type="text"
                onChange={(e) => setSummary(e.target.value)}
                value={Summary}
            />
            <button>Create Course</button>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </form>

    )
}

{/* <label>Subtitle Title:</label>
            <input
                type="text"
                onChange={(e) => setSubtitle(e.target.value)}
                value={subtitle}
            />
            <label>Subtitle Hours:</label>
            <input
                type="text"
                onChange={(e) => setSubHours(e.target.value)}
                value={subHours}
            />
            <label>Subtitle Video Title:</label>
            <input
                type="text"
                onChange={(e) => setVideoTitle(e.target.value)}
                value={videoTitle}
            />
            <label>Subtitle Video URL:</label>
            <input
                type="text"
                onChange={(e) => setVideoURL(e.target.value)}
                value={videoURL}
            /><label>Subtitle Video Description:</label>
            <input
                type="text"
                onChange={(e) => setVideoDesc(e.target.value)}
                value={videoDesc}
            /> */}

export default NewCourseForm 