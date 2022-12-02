import {useEffect,useState} from 'react'

import DropDown from '../components/CountryDropDown'
import { useAuthContext } from '../hooks/useAuthContext'

//import NewCourseForm from '../components/NewCourseForm'
const Course = () => {
    const {user} = useAuthContext();
    const [courses,setCourses] = useState(null)
    const[error,setError]=useState(null)


    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/trainee/page/viewAllCourses',{
                method: 'GET',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                setCourses(json)

            }
            if(!response.ok){
                setError(error)
            }
        }
        fetchCourses()
    }, )

    return (
        <div className="Course">
            <DropDown courses={courses}/>
            {error && <div className='error'>{error}</div>}
          
        </div>
    )
}

export default Course