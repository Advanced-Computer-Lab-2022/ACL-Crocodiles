const corpTraineeCourseDetails = ({ course }) => {
    return(
        <div className="course-details">
            <h4>{course.Title}</h4>
            <p><strong>Total hours: </strong>{course.Hours}</p>    
            <p><strong>Rating: </strong>{course.Rating}</p>
        </div>
    )
}

export default corpTraineeCourseDetails