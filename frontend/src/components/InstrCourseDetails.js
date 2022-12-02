import { useState } from 'react'
import Subtitle from './Subtitle'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
const InstrCourseDetails = ({ course, currency, rate }) => {

    const courseid = course._id
    const { user } = useAuthContext()
    console.log(courseid)

    if (course.Discount != null)
        var discountRate = 1 - (course.Discount / 100)
    else
        var discountRate = 1
    var newPrice = course.Price * discountRate

    if (rate)
        var newPrice = Math.round(course.Price * rate * discountRate * 100) / 100
    var oldPrice = Math.round(course.Price * rate * 100) / 100
    var navigate = useNavigate()

    const Click = () => {
        navigate('/definediscount/' + course._id)
    }


    const Click1 = () => {
        const fetchExam = async () => {
            const response = await fetch('/api/instructor/createexam/' + course._id, {
                method: 'POST', headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                }
            })
        }
        fetchExam();
        navigate('/createExam/' + course._id)
    }




    return (
        <div className="course-details">
            <h4>{course.Title}</h4>

            <p><strong>Hours: </strong>{course.Hours}</p>
            <p><strong>Rating: </strong>{course.Rating}</p>
            <p><strong>Discount: </strong>{course.Discount}</p>
            {newPrice != 0 ? <p><strong>Price: </strong>{discountRate != 1 ? <s>{oldPrice} </s> : null} {newPrice} {currency}</p> : null}
            <p>{newPrice == 0 ? <><p class="same"><strong>Price: </strong></p> {discountRate != 1 ? <s> {oldPrice} {currency}</s> : null} <p style={{ color: 'green' }} class="same"> FREE</p></> : null}</p>
            <button onClick={Click}>Define Promotion</button>

            <button onClick={Click1}>Create Exam</button>

        </div>
    )
}

export default InstrCourseDetails