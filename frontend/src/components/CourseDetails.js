import {useState, useEffect} from 'react'

const CourseDetails = ({ course, currency }) => {
    
    return(
        <div className="course-details">
            <h4>{course.Title}</h4>
            <p><strong>Subject:</strong>{course.Subject}</p>    
            <p><strong>Hours:</strong>{course.Hours}</p>
            <p><strong>Rating: </strong>{course.Rating}</p>
            <p><strong>Price: </strong>{course.Price} {currency}</p>
        </div>
    )
}

export default CourseDetails