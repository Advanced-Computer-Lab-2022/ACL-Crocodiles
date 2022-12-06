import React from 'react'
import {useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { bgcolor, Container } from '@mui/system';
import { Typography } from '@mui/material';
import bgImage from "../images/hope.jpg";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TraineeDrawer from '../components/TraineeDrawer'

// import rgba from "../functions/rgba";


const  CoursePageLayout= (course,Subtitles,vidHandler,exerciseHandler)=> {

    const [open,setOpen] = useState(false);
 
    const menuHandler = () =>{
      setOpen(true);
    
    }
    const arrowHandler = () =>{
      setOpen(false);
    
    }



  return (
<Box sx={{ margin:"-20px"}}>
  <Grid container  sx={{ height: "110vh"}} alignItems="center">
  
 {open? 
 <Grid item xs={1.9} >
<TraineeDrawer subtitles={Subtitles} arrowHandler={arrowHandler} open={open} vidHandler={vidHandler} exerciseHandler={exerciseHandler} />
</Grid>:
 <Grid item xs={0.0001} >
 <TraineeDrawer subtitles={Subtitles} arrowHandler={arrowHandler} open={open} vidHandler={vidHandler} exerciseHandler={exerciseHandler} />
 </Grid>}

<Grid item xs >


       <Box
      sx={{
        backgroundImage: `url(${bgImage}) `,
        backgroundSize:"cover",
        backgroundRepeat: "no-repeat",
        display: "grid",
        placeItems: "center",
        minHeight: "75vh",
        width:"100%",
      }}
    >

     <Container       
    sx={{ marginLeft:"inherit"}}
    >
           
     <IconButton
            color="inherit"
            aria-label="open drawer"
          onClick={menuHandler}
            edge="start"
            sx={{  height: '50%',mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon sx={{fontSize:40, color:'white'}}/>
          </IconButton>

          <Grid
            container
            item
            xs={10}
            lg={8}
            alignContent="left" justifyContent="left"
            
            alignItems="left"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "left" , width:"75%"}}
          >
            <Typography
              variant="h2"
              color="white"
             
              textAlign = 'left'
            >

          {course.Title}
            </Typography>
          
            </Grid>
            </Container>


   </Box>
    </Grid>
    </Grid>
    </Box>
   
  )
}

  export default CoursePageLayout
