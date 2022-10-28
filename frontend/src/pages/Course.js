import {useEffect,useState} from 'react'
import CourseDetails from '../components/CourseDetails'
//import NewCourseForm from '../components/NewCourseForm'
const Course = () => {
    const [courses,setCourses] = useState(null)

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/trainee/page/viewAllCourses')
            const json = await response.json()
            if(response.ok){
                setCourses(json)
            }
        }
        fetchCourses()
    }, [])

    return (
        <div className="Course">
            <div className="courses">
                {courses && courses.map((course) =>(
                    <CourseDetails key={course._id} course={course}/>
                ))}
            </div>
        </div>
    )
}

export default Course