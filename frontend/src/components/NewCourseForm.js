import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Alert, AlertTitle, Fade } from '@mui/material';


const NewCourseForm = () => {
    const { user } = useAuthContext()
    const [Title, setTitle] = useState('')
    const [Subject, setSubject] = useState('')
    const [Hours, setHours] = useState('')
    const [Price, setPrice] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState('')
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [subHours, setSubHours] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [videoURL, setVideoURL] = useState('')
    const [videoDesc, setVideoDesc] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }
        const course = { Title, Subject, Hours, Price }
        console.log(JSON.stringify(course))
        const response = await fetch('/api/instructor/createcourse', {
            method: 'POST', body: JSON.stringify(course), headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setSubject('')
            setHours('')
            setPrice('')
            //setID('')
            // setId('')
            setError(null)
            setSuccess("Course Created Successfully")
            console.log('new course added', json)
        }
    }


    return (
        <form className="createcourse" onSubmit={handleSubmit}>
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
            <label>Course Hours:</label>
            <input
                type="number"
                onChange={(e) => setHours(e.target.value)}
                value={Hours}
            />
            <label>Course Price:</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={Price}
            />

            <button>Create Course</button>
            {error && <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
            </Alert>}

            {success && <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                {success}
            </Alert>}


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