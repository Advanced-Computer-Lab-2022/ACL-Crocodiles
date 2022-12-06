import {useEffect,useState} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import CourseCard from '../components/CourseCard'
import Grid from '@mui/material/Grid';
import DropDown from '../components/CountryDropDown'
import { useAuthContext } from "../hooks/useAuthContext"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const TraineeCourses = () => {
  const{user} = useAuthContext()
  console.log(user)
    const [courses,setCourses] = useState(null)
    const [clicked,setClicked] = useState(null);
    useEffect(() => {
        console.log(clicked)
        const fetchCourses = async () => {
            const response = await fetch('/api/trainee/page/MyCourses',{
              headers: {
              'Authorization': `Bearer ${user.token}`
                  }
              })
            const json = await response.json()
            if(response.ok){
                setCourses(json)
            }
        }
        fetchCourses()
    }, [user])

    return (
        <div className="Course">


<React.Fragment>
    <Grid container 
     direction="Column"
    item spacing={4}>
        {courses && courses.map(course => (
            <Grid item xs={6} >
            <CourseCard Course={course} redirect={`/Mycourses/course?courseId=${course._id}`}/>
          </Grid>
        ))}
        

        </Grid>
      </React.Fragment>

    </div>
    )
}

export default TraineeCourses