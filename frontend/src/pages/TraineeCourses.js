import { useEffect, useState } from 'react'


import { styled } from '@mui/material/styles';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import CourseCard from '../components/CourseCard'
import Grid from '@mui/material/Grid';
import { Alert } from '@mui/material';
import NewCourseCard from '../components/NewCourseCard'
import { useAuthContext } from "../hooks/useAuthContext"
import TraineeNavBar from '../components/TraineeNavBar'
import {CircularProgress,Typography} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TraineeCourses = () => {
  const { user } = useAuthContext()
  console.log(user)
  const [courses, setCourses] = useState(null)
  const[error,setError] = useState(null)
  const[Loading,setLoading] = useState(true)
  const [clicked, setClicked] = useState(null);
  useEffect(() => {
    console.log(clicked)
    const fetchCourses = async () => {
      const response = await fetch('/api/trainee/page/course/MyCourses', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setCourses(json)
       
      }
      if(!response.ok){
        setError(json.error)
      }
      setLoading(false)
    }
    fetchCourses()
  }, [user])

  return (
    <div className="Course">


      <React.Fragment>

<Grid container
          item spacing={1}>
          {Loading && <CircularProgress sx={{margin:"400px auto"} } size='10rem' /> }
          {courses && courses.map(course => (
            <Grid item xs={12} sm={6} md={4}>
                <NewCourseCard user={user} Course={course} redirect={`/Mycourses/course?courseId=${course._id}`}/>
          </Grid>
    
          ))}

           {!Loading && courses.length===0 && <Typography variant='h4'> You havent subscribed to any of our courses yet! </Typography>}
        </Grid>
      </React.Fragment>

    </div>
  )
}

export default TraineeCourses