import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import DropDown from '../components/CountryDropDown'
import NewCourseCardViewAll from '../components/NewCourseCardViewAll'
import { Box, CircularProgress, Grid, Skeleton, Stack } from '@mui/material';
import TraineeNavBar from '../components/TraineeNavBar'

//import NewCourseForm from '../components/NewCourseForm'
const Course = () => {
    const { user } = useAuthContext();
    const [courses, setCourses] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/guest/viewAllCourses')
            const json = await response.json()
            if (response.ok) {
                setCourses(json)
                setLoading(false)

            }
            if (!response.ok) {
                setError(error)
                setLoading(false)
            }
        }
        fetchCourses()
    },[user])




    return (
        
        <div className="Course">
            
            {/* <DropDown courses={courses} /> */}
            <Grid container
          item spacing={1}>
            {loading && 
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
            </Box>
            </Grid>
            
            }
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