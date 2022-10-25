import {useEffect,useState} from 'react'
import CourseDetails from '../components/CourseDetails'
import NewCourseForm from '../components/NewCourseForm'
const Home = () => {
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
        <div className="home">
            <div className="courses">
                {courses && courses.map((course) =>(
                    <CourseDetails key={course._id} course={course}/>
                ))}
            </div>
            <NewCourseForm/>
        </div>
    )
}

export default Home
