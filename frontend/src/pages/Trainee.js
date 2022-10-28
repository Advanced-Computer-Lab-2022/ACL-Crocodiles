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
        <div className="Trainee">
            <h2>Trainee Page</h2>
            <div class="A">
            <CountrySelector/>
            <div className='courses'>
            {Course && Course.map((course) => (
                <TraineeCourseDetails key={course._id} course={course}/>
            ))}
                   </div>
        </div>
        </div>
        
        
        )
}
 export default Trainee