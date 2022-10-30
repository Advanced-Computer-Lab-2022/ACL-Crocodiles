import {useEffect,useState} from 'react'
import CourseDetails from '../components/CourseDetails'
import Country from '../components/CountryTest'
let curr = '?'
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

    const getData = (Data)=>{
        
        curr=Data;
        console.log(curr)

    }
    return (
    
        <div className="Course">
              <Country onsubmit={getData} courses={courses}/> 
        </div>
    )
}

export default Course