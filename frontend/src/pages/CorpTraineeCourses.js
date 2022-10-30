import {useEffect,useState} from 'react'
import CorpTraineeCourseDetails from '../components/CorpTraineeCourseDetails'
//import NewCourseForm from '../components/NewCourseForm'
const CorpTraineeCourses = () => {
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
                    <CorpTraineeCourseDetails key={course._id} course={course}/>
                ))}
            </div>
        </div>
    )
}

export default CorpTraineeCourses