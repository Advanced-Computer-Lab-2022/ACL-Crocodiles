import {useEffect,useState} from 'react'
import SearchDetails from '../components/SearchDetails'

const Course = () => {
    const [courses,setCourses] = useState(null)

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/instructor/getcoursesbyid')
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
                    <SearchDetails key={course._id} course={course}/>
                ))}
            </div>
        </div>
    )
}

export default Course