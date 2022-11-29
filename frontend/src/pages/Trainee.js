import {useEffect, useState} from 'react'
import TraineeCourseDetails from '../components/TraineeCourseDetails'
import CountrySelector from '../components/CountrySelector'


const Trainee = () => {
    const [Course, setCourses] = useState(null)
    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/trainee/page/viewAllCourses');
            const json = await response.json()
        if(response.ok){
            setCourses(json)
        }
        }
        fetchCourses();
    }, [])

    return(

        <div className="trainee">
           <div class="topnav">
                <a href="/filter">
                    <input type="button" value="Filter" />
                </a>
                <a href="/course">
                    <input type="button" value="View All Courses" />
                </a>
            </div>
            
        </div>

                
        
        )
}
 export default Trainee