import { useState } from 'react'
import Subtitle from './Subtitle'

const CourseDetails = ({ course,currency,rate }) => {
    if(course.Discount!= null)
        var discountRate = 1-(course.Discount/100)
    else
        var discountRate = 1
    var newPrice= course.Price*discountRate
    console.log(rate)
    if(rate)
        var newPrice = Math.round(course.Price*rate*discountRate*100) / 100
    var oldPrice = Math.round(course.Price*rate* 100) / 100


    return(
        <div className="course-details">
            <h4>{course.Title}</h4>

            <p><strong>Hours: </strong>{course.Hours}</p>
            <p><strong>Rating: </strong>  {course.Rating!==undefined? course.Rating +' / 5': 'no rating yet'} </p>
            {newPrice!=0?<p><strong>Price: </strong>{discountRate!=1? <s>{oldPrice} </s> : null } {newPrice} {currency}</p>: null }
            {newPrice==0? <><p class="same"><strong>Price: </strong></p> {discountRate!=1? <s> {oldPrice} {currency}</s> : null } <p style={{ color: 'green' }} class="same"> FREE</p></>: null }
            {course.Discount!==undefined? <p>{course.Discount}% discount valid until {course.DiscountEndDate}</p> :null}
            
        </div>
    )
}

export default CourseDetails