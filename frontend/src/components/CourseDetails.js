import {useState} from 'react'
import Subtitle from './Subtitle'

const CourseDetails = ({ course,currency,rate }) => {
    var newPrice= course.Price
 
    if(rate)
    var newPrice = Math.round(course.Price*rate* 100) / 100


    return(
        <div className="course-details">
            <h4>{course.Title}</h4>
            
            <p><strong>Hours: </strong>{course.Hours}</p>
            <p><strong>Rating: </strong>{course.Rating}</p>
            {course.Price!=0?<p><strong>Price: </strong>{newPrice} {currency}</p>: null }
            {course.Price==0? <><p class="same"><strong>Price: </strong></p><p style={{ color: 'green' }} class="same"> FREE</p></>: null }
           
        </div>
    )
}

export default CourseDetails