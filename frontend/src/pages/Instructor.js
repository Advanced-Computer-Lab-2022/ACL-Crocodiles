import NewCourseForm from "../components/NewCourseForm"
import { useNavigate } from 'react-router-dom'

//import ExamForm from "./ExamForm"
import EditForm from "../components/EditInstructor"
import Exam from "../components/Exam"
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from 'react'

const Instructor = () => {
    const [rating, setRating] = useState(null)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const getMyRating = async () => {
        if (!user) {
            console.log('You must be logged in')
            return
        }
        const response = await fetch('/api/instructor/getrating', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            console.log(json.error)
            setError(json.error)
        }
        if (response.ok) {
            console.log('rating', json)
            setRating(json.Rating)
            setError(null)
        }
    }

    useEffect(() => {
        getMyRating()
    }, [])


    return (

        <div className="instructor">
            <h1>Instructor Page</h1>
            <div class="topnav">
                <p><strong>My Rating: </strong> {rating !== null ? rating + ' / 5' : 'not rated yet'}</p>
                <a href="/search">
                    <input type="button" value="Search by instructorID" />
                </a>
                <a href="/filter">
                    <input type="button" value="Filter" />
                </a>
                <a href="/course">
                    <input type="button" value="View All Courses" />
                </a>
                <a href="/InstructorCourses">
                    <input type="button" value="View My Courses" />
                </a>

                <a href="/contract">
                    <input type="button" value="View Contract" />
                </a>
            </div>
            <NewCourseForm />

            <EditForm />
        </div>



    )
}
export default Instructor