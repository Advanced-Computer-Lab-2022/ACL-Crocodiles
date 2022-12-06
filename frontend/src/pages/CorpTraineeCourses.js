import {useEffect,useState} from 'react'
import CorpCourseDetails from '../components/CorpTraineeCourseDetails'
//import NewCourseForm from '../components/NewCourseForm'
import { useAuthContext } from "../hooks/useAuthContext";

const CorpTraineeCourse = () => {
    const [courses,setCourses] = useState(null)
    const{user} = useAuthContext()

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/trainee/page/viewAllCourses', {headers:{'Authorization': `Bearer ${user.token}`}})
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
                    <CorpCourseDetails key={course._id} course={course}/>
                ))}
            </div>
        </div>
    )
}

export default CorpTraineeCourse