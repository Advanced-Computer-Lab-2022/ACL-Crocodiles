import React from 'react';

const NewTraineeViewAllCourses = () => {
    
    return (
      
<Grid container
          item spacing={1}>
          {courses && courses.map(course => (
            <Grid item xs={12} sm={6} md={4}>
                <NewCourseCard Course={course}/>
          </Grid>
    
          ))}


        </Grid>
    );
};

export default NewTraineeViewAllCourses;