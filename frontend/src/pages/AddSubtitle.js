import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const AddSubtitle = () => {
    const { user } = useAuthContext()
    const [subtitle, setSubtitle] = useState('')
    const [error, setError] = useState(null)
    const [subHours, setSubHours] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [videoURL, setVideoURL] = useState('')
    const [videoDesc, setVideoDesc] = useState('')
    const { courseid } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }
        const Subtitle = { subtitle, subHours, videoTitle, videoURL, videoDesc }
        console.log(JSON.stringify(Subtitle))
        console.log(courseid)
        const response = await fetch('/api/instructor/createsubtitle/' + courseid, {
            method: 'POST', body: JSON.stringify(Subtitle), headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setSubtitle('')
            setSubHours('')
            setVideoTitle('')
            setVideoURL('')
            setVideoDesc('')
            setError(null)
            console.log('new subtitle added', json)
        }
    }



    return (
        <form className="createsubtitle" onSubmit={handleSubmit}>
            <h3>Add a new Subtitle</h3>
            <label>Subtitle Title:</label>
            <input
                type="text"
                onChange={(e) => setSubtitle(e.target.value)}
                value={subtitle}
            />
            <label>Subtitle Hours:</label>
            <input
                type="number"
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
            />
            <button>Create Course</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AddSubtitle