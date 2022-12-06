import { useEffect, useState } from 'react'
import CorpCourseDetails from '../components/CorpTraineeCourseDetails'
//import NewCourseForm from '../components/NewCourseForm'
const CorpTraineeCourse = () => {
    const [courses, setCourses] = useState(null)

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/guest/viewAllCourses')
            const json = await response.json()
            if (response.ok) {
                setCourses(json)
            }
        }
        fetchCourses()
    }, [])

    return (
        <div className="Course">
            <div className="courses">
                {courses && courses.map((course) => (
                    <CorpCourseDetails key={course._id} course={course} />
                ))}
            </div>
        </div>
    )
}

export default CorpTraineeCourse