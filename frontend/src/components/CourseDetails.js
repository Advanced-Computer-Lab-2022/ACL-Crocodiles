const CourseDetails = ({ course }) => {
    return(
        <div className="course-details">
            <h4>{course.Title}</h4>
            
            <p><strong>Hours:</strong>{course.Hours}</p>
            <p><strong>Rating:</strong>{course.Rating}</p>
            <p><strong>Price:</strong>{course.Price}</p>
            <p><strong>Instructor Id:</strong>{course.InstructorId.id}</p>
        </div>
    )
}

export default CourseDetails