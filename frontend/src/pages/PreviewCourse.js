import { Grid,Box,Paper, Container,Typography,Stack,Accordion,AccordionSummary,AccordionDetails,Divider,Button, Alert} from "@mui/material"

import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

import Rating from "@mui/material/Rating"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import NewCourseCardViewAll from "../components/NewCourseCardViewAll"
import { redirect, useNavigate } from "react-router-dom";

const PreviewCourse = () => {
    const[error,setError] = useState(null)
    const[course,setCourse]=useState(null)
    const[type,setType]=useState(null)
    const[iscourse,setisCourse] = useState(null)
    const[courseId,setCourseId]=useState(null)
    const[corpError,setCorpError]=useState(false)
    const[corpSuccess,setCorpSuccess]=useState(false)
    const[corpDisabled,setCorpDisabled]=useState(false)
    const[corp,setCorp]=useState(null)
    const {user} = useAuthContext()
    const navigate = useNavigate();
    useEffect(() => {

   
        
        const params = new URLSearchParams(window.location.search);
        const courseId = params.get('courseId');
        const checkCourse = async () => {
        const response = await fetch (`../api/trainee/page/checkcourse/${courseId}`,{headers:{'Authorization': `Bearer ${user.token}`,}})
            
            const json = await response.json()
            console.log(json)
            if (response.ok) {
                if(json===0)
                    setisCourse(false)
                else if(json===1)
                    setisCourse(true)
                }
            if (!response.ok) {
                setError(error)
                }
            }
            if(user && user.Type === 'Trainee'){
                setType(false)
            }
            else {
                setType(true)
            }
            
        const fetchCourseDetails = async () => {
            const response = await fetch(`/api/guest/coursedetails/${courseId}`)
            const json = await response.json()
            if (response.ok) {
                setCourse(json)
                
                console.log(json)

            }
            if (!response.ok) {
                setError(error)
            }
        }
        const checkRequested = async () => {
            const response = await fetch(`/api/corpTrainee/page/checkRequested/${courseId}`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'content-type':'application/json',
                }
            })
            const json = await response.json()
            console.log('My check requested json is : '+json.requested)
            if (json.requested){
                setCorpDisabled(true)
            }
        }
        checkCourse()
        fetchCourseDetails()
        if(user && user.Type === 'Corporate'){
            checkRequested()
        }
    },[user])
    console.log(iscourse)
    const BuyClick = async (e) =>{
        e.preventDefault()
        if(user && user.Type=="Trainee" && !iscourse){
        const response =  await fetch('/api/trainee/page/buynow',{method:'POST',body:JSON.stringify(course.coursedetails), headers: {
                'Authorization': `Bearer ${user.token}`,
                'content-type':'application/json',
            }
          })
          const json = await response.json()
          console.log(json.url)

        if(!response.ok){
           setError(json.error)
        }
        if (response.ok){
            window.location.assign(json.url)
      
        }
        
    }
    const RequestClick = async (e) =>{
        e.preventDefault()
        const mybody = {CourseID: course.coursedetails._id, CourseTitle: course.coursedetails.Title, TraineeUsername: user.Username}
        const response = await fetch('/api/corpTrainee/page/requestCourse', 
        {method:'POST',body:JSON.stringify(mybody), headers: {
            'Authorization': `Bearer ${user.token}`,
            'content-type':'application/json',
        }
        })
        const json = await response.json()
        if(!response.ok){
            setCorpError(true)
            setCorpSuccess(false)
        }
        if (response.ok){
            setCorpSuccess(true)
            setCorpDisabled(true)
            setCorpError(false)
        }
    }



    return(
        <Box>
   
        <Box  alignItems="left">
        
        <Container fixed sx={{align:'center' ,alignItems: 'center', backgroundColor:"#a00407" ,height:300, margin:"-15px auto"} } alignItems='center'
            >
        <Grid sx={{alignItems: 'center',display: 'flex',flexDirection: 'column' ,  backgroundColor:"#a00407",width:600 ,ml:'200px',height:300}}
              align = "center"

                        >
        <Typography variant="h3" gutterBottom sx={{color:'white'}}>
        {course && course.coursedetails.Title}
        </Typography>
        <Typography variant="h4" gutterBottom sx={{color:'white'}}>
        {course && course.coursedetails.Subject}
        </Typography>
        <Stack direction="row">
        <Typography component="legend" variant='body' sx={{color:'yellow'}}>{course && course.Rating} </Typography>
        <Rating name="read-only" value={course && course.coursedetails.Rating} readOnly /> 
        </Stack>
        <Typography variant="body" gutterBottom sx={{color:'white' ,margin:"0,200px"}} align='center'>
        {course && course.coursedetails.Summary}
        </Typography>
        <Typography variant="body" gutterBottom sx={{color:'black' ,margin:"0,200px"}} align='center'>
        Author: {course && course.instructordetails && course.instructordetails.Firstname}  {course && course.instructordetails && course.instructordetails.Lastname}
        </Typography>
        </Grid>
        </Container>
        <Typography variant="h5"  sx={{color:'black' ,margin:"50px 100px"}} align='left'>
        Course Content
        </Typography>
        <Stack direction='row'>
        <Grid sx={{ width:600 ,margin:"-40px 75px" ,border: "2px solid #a00407"  , borderRadius: '7px'}}>
        
        {course && course.coursedetails.Subtitle && course.coursedetails.Subtitle.map((subtitle) => (
               <Accordion >
               <AccordionSummary
              
               expandIcon={<ExpandMoreIcon />}
               id="panel1a-header"
               >
               <Typography  >{subtitle.Title}</Typography>
               </AccordionSummary>
               {subtitle.Videos.map((video) => (
               <AccordionDetails  sx={{ color:"white" ,backgroundColor:"#a00407"}}>
                <PlayArrowIcon/><Typography> {video.Title}</Typography>
               </AccordionDetails>))}
              
               </Accordion>
        ))}
     
         
        </Grid >
       
        <Stack direction='column'>
        <Typography variant="h5"  sx={{color:'black' ,margin:"-75px 0px"}} align='left'>
               Course Description
        </Typography>
        <Grid sx={{ width:600 ,margin:"75px -35px" ,border: "2px solid #a00407"  , borderRadius: '7px' ,padding:"10px" ,background:'white'}}>
        <Typography  >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis ipsum epsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione iure repellat dolor expedita autem omnis est perferendis, perspiciatis molestias in laboriosam esse tempora nisi nobis dicta odit commodi neque? Vitae.
            </Typography>
        
        </Grid>
        {corp ? 
        <Button sx={{ height:100 ,width:400 ,background:"green", margin:"0px auto"}}disabled={corpDisabled} variant="contained" onClick={RequestClick} >Request Access</Button>
         :
        <Button sx={{ height:100 ,width:400 ,background:"green", margin:"0px auto"}} disabled={type || iscourse} variant="contained" onClick={BuyClick} >Buy Now</Button>}
        {corpSuccess && <Alert severity="success">{'Course Requested Successfully'}</Alert>}
        {corpError && <Alert severity="error">{'Course Request Failed'}</Alert>}
        </Stack>
      
        </Stack>
        <Typography align="left" sx={{mt:"100px" ,ml:"60px"}}variant="h5"  >Other courses by Author</Typography>
        <Grid container
          item spacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }} sx={{ margin:"40px 0px "}} >
        <Stack spacing={1.5} direction={'row'}>
            <Grid itemspacing={2} sx={{ml:"80px"}}>
        {course && course.othercourses && course.othercourses.map((courses) => (
            <NewCourseCardViewAll Course={courses} redirect={`/course/previewcourse?courseId=${courses._id}`}/>
        ))}
        </Grid>
        </Stack>
        
        </Grid>
        </Box>
        
        </Box>

    )
}

export default PreviewCourse