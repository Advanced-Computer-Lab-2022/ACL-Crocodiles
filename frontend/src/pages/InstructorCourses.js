import {useEffect,useState} from 'react'
import DropDown from '../components/CountryDropDown'
import InstrDropDown from '../components/InstrDropDown'
import { useAuthContext } from "../hooks/useAuthContext"
import { useCoursesContext } from '../hooks/useCoursescontext'
//import NewCourseForm from '../components/NewCourseForm'
const Course = () => {
    const [courses,setCourses] = useState(null)
    const[error,setError] = useState(null)
    const{user} = useAuthContext()
    useEffect(() => {     
        const fetchCourses = async () => {            
            const response = await fetch('/api/Instructor/viewAllinsCourses',{headers: {
                'Authorization': `Bearer ${user.token}`
                    }
                }
            )
            
            const json = await response.json()
           
            if(response.ok){
                setCourses(json)
            }
        }
        if(user)
            fetchCourses() 
    })

    return (
        <div className="Course">
            <InstrDropDown courses={courses}/>
            {error && <div className='error'>{error}</div>}
        </div>
    )
}

export default Course