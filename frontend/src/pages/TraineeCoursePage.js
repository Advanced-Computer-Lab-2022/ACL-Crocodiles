import React from 'react'
import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import { bgcolor, Container } from '@mui/system';
import { Typography } from '@mui/material';
import bgImage from "../images/hope.jpg";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import RatingAndReview from '../components/RatingAndReview';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TraineeDrawer from '../components/TraineeDrawer'
import CircularProgressWithLabel from '../components/CircularProgressWithLabel'
import GradeWidget from '../components/GradeWidget'
import CheckAnswersWidget from '../components/CheckAnswersWidget'
import TakeTestWidget from '../components/TakeTestWidget'
import GradeWidgetHelper from '../components/GradeWidgetHelper'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


// import rgba from "../functions/rgba";

const TraineeCoursePage = () => {
  const { user } = useAuthContext()
  console.log(user)
  const [course, setCourse] = useState("");
  const [Subtitles, setSubtitles] = useState([]);
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState(null);
  const [exercise, setExercise] = useState(null);
  const params1 = new URLSearchParams(window.location.search);
  const courseid1= params1.get('courseId');
  const navigate = useNavigate();

  const menuHandler = () => {
    setOpen(true);

  }
  const arrowHandler = () => {
    setOpen(false);

  }
  const vidHandler = (Video) => {
    setVideo(Video);
    setExercise("");

  }
  const exerciseHandler = (Exercise) => {
    setExercise(Exercise);
    setVideo("");

  }

  useEffect(() => {

    const fetchCourse = async () => {
      //console.log(user+"hi")
      const params = new URLSearchParams(window.location.search);
      const courseId = params.get('courseId');

      const response = await fetch(`/api/trainee/page/MyCourses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setCourse(json)
        setSubtitles(json.Subtitle);



      }
     }
    // const fetchAnswer= async () => {
    //   const response = await fetch('/api/trainee/page/getAssignment/' , {
    //       method: 'POST', headers: {
    //           'content-type': 'application/json',
    //           'Authorization': `Bearer ${user.token}`

    //       },
    //       body:  JSON.stringify({
    //           Examid: exercise._id})
    //   })


    //   const json = await response.json()
    //   let grade = 0;
     
    //   if (response.ok) {
    //     const answer = json.Answer;
    //     for(let i=0; i<answer.length;i++){
    //       if(answer[i]==exercise.Questions.correctAnswer){
    //         grade+=1;
    //       }
    //     }
    //     grade=(grade/answer.length)*100
   
    //   }
    //   console.log(exercise)
    // }
  
    fetchCourse()
    // fetchAnswer()

  }, [user])


  return (
    <Box sx={{ margin: "-20px" }}>
      <Grid container sx={{ height: "110vh" }} alignItems="flex-start">

        {open ?
          <Grid item xs={1.9} >
            <TraineeDrawer subtitles={Subtitles} arrowHandler={arrowHandler} open={open} vidHandler={vidHandler} exerciseHandler={exerciseHandler} />
          </Grid> :
          <Grid item xs={0.0001} >
            <TraineeDrawer subtitles={Subtitles} arrowHandler={arrowHandler} open={open} vidHandler={vidHandler} exerciseHandler={exerciseHandler} />
          </Grid>}

        <Grid item xs >


          <Box
            sx={{
              backgroundImage: `url(${bgImage}) `,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              display: "grid",
              placeItems: "flex-start",
              minHeight: "75vh",
              width: "100%",
            }}
          >

            <Container
              sx={{ marginLeft: "inherit" }}
            >

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={menuHandler}
                edge="start"
                sx={{ height: '50%', mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon sx={{ fontSize: 40, color: 'white' }} />
              </IconButton>
            </Container>
            {/* <Card  sx={{ width: '75%' ,height:'300%'}} >
     
        <CardMedia
         sx={{ padding: "1em 1em 0 1em", objectFit: "contain"  ,height:'100%'}}
  component="iframe"
  image="https://www.youtube.com/embed/muuK4SpRR5M"
/>
            </Card> */}
            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
              <Grid
                container
                item
                xs={10}
                lg={8}
                alignContent="center" justifyContent="center"

                alignItems="center"
                flexDirection="column"
                sx={{ mx: "auto", textAlign: "left", width: "75%" }}
              >
                <Typography
                  variant="h2"
                  color="white"

                  textAlign='left'
                >
                  {/* {(video && video.Title) || (exercise && exercise.Title)} */}
                  {course.Title}
                </Typography>
                
              </Grid>
              <Grid
              container
              item
              xs={3}
              lg={4}
              alignContent="center" justifyContent="center"
              margin="20px"
              alignItems="center"
              flexDirection="column"
              >
                <RatingAndReview courseID={courseid1} />
                <Button
                variant="text"
                onClick={() => {navigate('/viewratings/'+courseid1)}}
                >
                    <Stack direction="column" spacing={1} alignItems="center">
                        <Typography>View All Ratings and Reviews</Typography>
                    </Stack>
            </Button>
              </Grid>
              
            </Stack>


          </Box>

          {video || exercise ? <Paper elevation={3} sx={{ margin: 'auto', marginTop: "-70px", borderRadius: '16px', alignSelf: "center", width: '95%', alignItems: 'center', justifyContent: 'center', alignContent: "center" }}>


            {exercise ?
              <Stack alignItems="center">

                {/* 
<Paper>
{exercise.Title}
{exercise.Questions && exercise.Questions.map((Question,i) => (
              <div>
              <Typography>{Question}</Typography>
          
                 
                {exercise.Options[i] && exercise.Options[i].map((option) => (
                  <Typography> {option}    </Typography>
                  ))}
              
                 
              </div>
                ))}
</Paper> */}

              </Stack>
              : <></>}
            {video ? <Box sx={{ margin: "auto", height: "100%" }}>

              <Grid container alignItems="center" justifyContent="center"  >
                <Grid item xs={12} sx={{ minHeight: "50px" }}>
                  <Box alignItems="center" sx={{ height: "100px", display: "grid" }}>
                    <Typography textAlign='center' variant='h3'>{video && video.Title} </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="center" sx={{ marginBottom: "4%" }}>
                    <Grid item xs={8} >
                      <Box alignItems="top" sx={{ minHeight: "fit-content", display: "grid" }}>
                        {/* {video?<iframe frameborder="0" scrolling="no" marginheight="30" marginwidth="0"width="80%" height="600" type="text/html" src={video && video.url} ></iframe>:<></>} */}
                        <div style={{ position: "relative", height: 0, overflow: "hidden", paddingBottom: "56.25%", /* 16/9 ratio */ borderStyle: "none", objectFit: "cover" }}>
                          {video ? <iframe style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: '16px', objectFit: "cover" }} src={video.url}></iframe> : <></>}
                        </div>
                      </Box>
                    </Grid>

                  </Grid>

                </Grid>
              </Grid>
            </Box> : <></>}
            {exercise ?
              <Box sx={{ height: 400, display: "flex", }} justifyContent="center" alignItems="center">
                <Grid container justifyContent="center" alignItems="center" spacing={2}>

                  <Grid item>
                    < TakeTestWidget examid={exercise._id} type={"Trainee"}/>
                  </Grid>
                  <Grid item>
                    < CheckAnswersWidget  examid={exercise._id} type={"Trainee"} />
                  </Grid>
                  <Grid item>
                    <GradeWidgetHelper ExamId={exercise._id} type={"Trainee"}/>
                  </Grid>


                </Grid>
              </Box>
              : <></>}
          </Paper> : <></>}
        </Grid>
      </Grid>
    </Box>

  )
}

export default TraineeCoursePage