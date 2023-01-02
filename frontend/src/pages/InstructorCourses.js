import {useEffect,useState} from 'react'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import DropDown from '../components/CountryDropDown'
import InstrDropDown from '../components/InstrDropDown'
import { useAuthContext } from "../hooks/useAuthContext"
import { useCoursesContext } from '../hooks/useCoursescontext'
import Grid from '@mui/material/Grid';
import NewCourseCard from '../components/NewCourseCard'

//import NewCourseForm from '../components/NewCourseForm'
const InstructorCourses = () => {
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
           console.log("Instructor courses using /api/Instructor aree :::>>  "+json)
            if(response.ok){
                setCourses(json)
            }
        }
        if(user)
            fetchCourses() 
    },[user])

    return (
        <div className="Course">
            <React.Fragment>

<Grid container
          item spacing={1}>
          {courses && courses.map(course => (
            <Grid item xs={12} sm={6} md={4}>
                <NewCourseCard user={user} Course={course} redirect={`/instructorcourse/${course._id}`}/>
          </Grid>
    
          ))}


        </Grid>
      </React.Fragment>
    </div>
    )
}

export default InstructorCourses