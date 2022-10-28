const CourseDetails = ({ course }) => {
    return(
        <div className="course-details">
            <h4>{course.Title}</h4>
            <p><strong>Subject:</strong>{course.Subject}</p>    
            <p><strong>Hours:</strong>{course.Rating}</p>
        </div>
    )
}

export default CourseDetails