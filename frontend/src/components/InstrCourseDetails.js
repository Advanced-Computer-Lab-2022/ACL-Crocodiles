import {useState} from 'react'
import Subtitle from './Subtitle'
import { useNavigate } from 'react-router-dom'
const InstrCourseDetails = ({ course,currency,rate }) => {
    var newPrice= course.Price
    console.log(rate)
    if(rate)
    var newPrice = Math.round(course.Price*rate* 100) / 100
    var navigate=useNavigate()

const Click = () =>{
    navigate('/definediscount/'+course._id)
}

    return(
        <div className="course-details">
            <h4>{course.Title}</h4>
            
            <p><strong>Hours: </strong>{course.Hours}</p>
            <p><strong>Rating: </strong>{course.Rating}</p>
            <p><strong>Discount: </strong>{course.Discount}</p>
            {course.Price!=0?<p><strong>Price: </strong>{newPrice} {currency}</p>: null }
            {course.Price==0? <><p class="same"><strong>Price: </strong></p><p style={{ color: 'green' }} class="same"> FREE</p></>: null }
            <button onClick={Click}>Define Promotion</button>
           
        </div>
    )
}
    
export default InstrCourseDetails