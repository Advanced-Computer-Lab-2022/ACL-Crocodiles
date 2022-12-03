import { useNavigate } from 'react-router-dom'

const TraineeCourseDetails = ({ course, currency, rate }) => {
    var newPrice = course.Price
    var navigate = useNavigate()
    console.log(rate)
    if (rate)
        var newPrice = Math.round(course.Price * rate * 100) / 100

    const viewExams = () => {
        navigate('/viewExams/' + course._id)
    }

    return (
        <div className="course-details">
            <h4>{course.Title}</h4>

            <p><strong>Hours: </strong>{course.Hours}</p>
            <p><strong>Rating: </strong>{course.Rating}</p>
            {course.Price != 0 ? <p><strong>Price: </strong>{newPrice} {currency}</p> : null}
            {course.Price == 0 ? <><p class="same"><strong>Price: </strong></p><p style={{ color: 'green' }} class="same"> FREE</p></> : null}

            <button onClick={viewExams}>View Exams</button>
        </div>
    )
}

export default TraineeCourseDetails