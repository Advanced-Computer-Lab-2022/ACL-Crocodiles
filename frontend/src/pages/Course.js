import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import DropDown from '../components/CountryDropDown'
import NewCourseCardViewAll from '../components/NewCourseCardViewAll'
import { Grid } from '@mui/material';
import TraineeNavBar from '../components/TraineeNavBar'

//import NewCourseForm from '../components/NewCourseForm'
const Course = () => {
    const { user } = useAuthContext();
    const [courses, setCourses] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/guest/viewAllCourses')
            const json = await response.json()
            if (response.ok) {
                setCourses(json)

            }
            if (!response.ok) {
                setError(error)
            }
        }
        fetchCourses()
    },[user])




    return (
        
        <div className="Course">
    
            {/* <DropDown courses={courses} /> */}
            <Grid container
          item spacing={1}>
          {courses && courses.map(course => (
            <Grid item xs={12} sm={6} md={4}>
                <NewCourseCardViewAll Course={course} redirect={`/course/previewcourse?courseId=${course._id}`}/>
          </Grid>
    
          ))}


        </Grid>

            {error && <div className='error'>{error}</div>}

        </div>
    )
}

export default Course