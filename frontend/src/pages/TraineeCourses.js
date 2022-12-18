import { useEffect, useState } from 'react'


import { styled } from '@mui/material/styles';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import CourseCard from '../components/CourseCard'
import Grid from '@mui/material/Grid';
import NewCourseCard from '../components/NewCourseCard'
import { useAuthContext } from "../hooks/useAuthContext"
import TraineeNavBar from '../components/TraineeNavBar'

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
  const [clicked, setClicked] = useState(null);
  useEffect(() => {
    console.log(clicked)
    const fetchCourses = async () => {
      console.log(user.token)
      const response = await fetch('/api/trainee/page/MyCourses', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setCourses(json)
      }
    }
    fetchCourses()
  }, [user])

  return (
    <div className="Course">


      <React.Fragment>

<Grid container
          item spacing={1}>
          {courses && courses.map(course => (
            <Grid item xs={12} sm={6} md={4}>
                <NewCourseCard user={user} Course={course} redirect={`/Mycourses/course?courseId=${course._id}`}/>
          </Grid>
    
          ))}


        </Grid>
      </React.Fragment>

    </div>
  )
}

export default TraineeCourses