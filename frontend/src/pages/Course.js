import {useEffect,useState} from 'react'
import CourseDetails from '../components/CourseDetails'
import DropDown from '../components/CountryDropDown'
import { useAuthContext } from '../hooks/useAuthContext'
//import NewCourseForm from '../components/NewCourseForm'
const Course = () => {
    const [courses,setCourses] = useState(null)
    const[error,setError]=useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/guest/page/viewAllCourses')
            const json = await response.json()
            if(response.ok){
                setCourses(json)

            }
            if(!response.ok){
                
            }
        }
        fetchCourses()
    },[] )

    return (
        <div className="Course">
            <DropDown courses={courses}/>
            {error && <div className='error'>{error}</div>}
          
        </div>
    )
}

export default Course