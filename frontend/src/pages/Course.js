import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import DropDown from '../components/CountryDropDown'
import NewCourseCardViewAll from '../components/NewCourseCardViewAll'
import { Grid } from '@mui/material';
import TraineeNavBar from '../components/TraineeNavBar'
import FilterDrawer from '../components/FilterDrawer';
import FilterDrawerSwipable from '../components/FilterDrawerSwipable';
import { useSelector } from 'react-redux';
//import NewCourseForm from '../components/NewCourseForm'
const Course = () => {

    const { user } = useAuthContext();
    const [courses, setCourses] = useState(null)
    const [subjectOptions, setSubjectOptions] = useState(null)
    const [error, setError] = useState(null)
    const currRatingRange = useSelector((state) => state.ratingFilter.value.range);
    const currPriceRange = useSelector((state) => state.priceFilter.value.range);
    const currSubjectFilter = useSelector((state) => state.subjectFilter.value.label);
    console.log(currSubjectFilter)
    const body = { Subject:currSubjectFilter,Rating: currRatingRange}


    const filterRS = async  () =>{
        const response = await fetch('/api/guest/filterbysr', {
            method: 'POST', body: JSON.stringify(body), headers: {
                'content-type': 'application/json'
                }
            })
            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                const t =[];
                        for(let i=0;i<json.length;i++){
                            if((json[i].Subject!=undefined) && json[i].Subject){
                                const found = t.find(element => element.label==json[i].Subject);
                                if(found==undefined){
                                    t.push({label:json[i].Subject})
                                }
                            }
                        
                        }
                setSubjectOptions(t);
                const response = await fetch('/api/guest/filterbyprice', {
                    method: 'POST', body: JSON.stringify({price:currPriceRange}), headers: {
                        'content-type': 'application/json'
                        }
                    })
                    const json1 = await response.json()
                    if (!response.ok) {
                        setError(json1.error)
                    }
                    if (response.ok) {
                        const intersection = json.filter((a) => json1.some((b) => a._id === b._id))
                        setCourses(intersection)
                        
                //setRating(0)
                setError(null)
            }
    
                }    }
  



    useEffect(() => {
        // const fetchCourses = async () => {
        //     const response = await fetch('/api/guest/viewAllCourses')
        //     const json = await response.json()
        //     if (response.ok) {
        //         setCourses(json)
       
        //     }
        //     if (!response.ok) {
        //         setError(error)
        //     }
        // }
        
        filterRS()
   
    },[user,currRatingRange,currSubjectFilter,currPriceRange])




    return (
        
        <div className="Course" style={{display:'flex'}}>
   
            {/* <DropDown courses={courses} /> */}
            
            {subjectOptions && <FilterDrawer subjectOptions={subjectOptions}/>}
            <FilterDrawerSwipable subjectOptions={subjectOptions}/>
            <Grid container
          item spacing={1}>
          {courses && courses.map(course => (
            <Grid item xs={12} sm={6} md={4}>
                <NewCourseCardViewAll Course={course}/>
          </Grid>
    
          ))}


        </Grid>
        {error && <div className='error'>{error}</div>}

          

        </div>
    )
}

export default Course