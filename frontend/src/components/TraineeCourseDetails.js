const TraineeCourseDetails = ({ course }) => {
    return(
        <div className="course-details">
            <h4>{course.Title}</h4>
            <p><strong>Total hours: </strong>{course.Hours}</p>    
            <p><strong>Rating: </strong>{course.Rating}</p>
            <p><strong>Price: </strong>{course.Price}</p>
        </div>
    )
}

export default TraineeCourseDetails