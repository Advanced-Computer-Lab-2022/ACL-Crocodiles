import { Grid, Typography, Link, Rating, Stack,MenuItem,DialogActions,Select,InputLabel,FormControl,Dialog,DialogTitle,DialogContent,TextField,DialogContentText} from "@mui/material";
import { Box, Container } from "@mui/system";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import pic from "../images/home1.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewCourseCardViewAll from "../components/NewCourseCardViewAll";
import NewCourseCard from "../components/NewCourseCard";
import { Alert, Button } from "@mui/material";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";


var settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  adaptiveHeight: true,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
};


const InstructorHome = () => {
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [error, setError] = useState(null)
    const[Gender,setGender] = useState('')
    const [Password, setPassword] = useState('')
    const[flag,setFlag] = useState(null)
    const[Firstname,setFirstname] = useState('')
    const[Lastname,setLastname] = useState('')

    const [popularCourses, setPopularCourses] = useState(null);
    const [rating, setRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const [OpenContract, setOpenContract] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 
    var Flag

  useEffect(() => {

    const getflag = async () => {
      const response = await fetch("/api/instructor/getflag", {
         method: "GET",
         headers: {
           "content-type": "application/json",
           Authorization: `Bearer ${user.token}`,
         },
       })
         const json = await response.json()
         if(response.ok)
           setFlag(json.flag)
     }



    const getRating = async () => {
        const response = await fetch("/api/instructor/getRating", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
        });
        const json = await response.json();
        setRating(json.Rating);
        setRatingCount(json.RatingCount);
    }
    fetch("/api/guest/getMostPopularCourses", {
      method: "GET",
      headers: {
        "content-type": "application/json",
    
      },
    })
      .then((response) => response.json())
      .then((data) => setPopularCourses(data))
      .catch((error) => {
        setAlert(error.message);
      });
    getRating();
    getflag()
  }, [user]);



  const handleEdit =  async (e) => {
    e.preventDefault()
   
    const body = {Firstname,Lastname,Gender,Password}
    const response = await fetch('/api/instructor/editinsinfo',{method:'POST',headers:{'Content-Type':'application/json','Authorization': `Bearer ${user.token}`,},
    body:JSON.stringify(body)
    })
    const json = await response.json()
    if(!response.ok){
      setError(json.error)
      console.log(json.error)
     }
    if (response.ok){
       setFlag(false)
       setOpenContract(true)
  
     }
    
 }


    const handleAgree = async (e) => {
      e.preventDefault()
      setOpenContract(false)
      user.flag = "false"
      Flag = false 
      const response = await fetch('/api/instructor/setflag',{method:'POST',headers:{'Content-Type':'application/json','Authorization': `Bearer ${user.token}`,},
      body:JSON.stringify({Flag})
      })

    const json = await response.json()
 //localStorage.setItem('user',JSON.stringify(json))
  }

  const handleViewRating =(e) => {
    e.preventDefault();
    navigate('/myratings');
  }

  return (
    <div style={{ backgroundColor: "white", margin: "-20px" }}>
      <Box>
        <Container
          sx={{ width: "100%", pl: "20px", pr: "20px", minHeight: "500px" }}
        >
          <Grid container spacing={3}>
            <Grid item>
         
                <Box sx={{ padding: "20px" }}>
                  <Typography
                    sx={{
                      "background-image":
                        "linear-gradient(52deg, #A00407, #ff5659)",
                      "-webkit-background-clip": "text",
                      "-webkit-text-fill-color": "#ff000000",
                      fontSize: "5rem",
                      fontFamily: "Poppins",
                      fontWeight: 600,
                    }}
                    variant="h1"
                  >
                    Welcome Back,
                  </Typography>
                  {user && <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontFamily: "Poppins",
                      fontSize: "3rem",
                    }}
                    variant="h2"
                  >
                    {user.Username}
                  </Typography>}
                  <Box sx={{alignItems:'center', justifyContent:'center',display:'flex',flexDirection:'column',width:'140px'}}>
                  <Button onClick={handleViewRating}>
                  <Rating name="read-only" value={rating} readOnly precision={0.1}/>
                    </Button>
                    <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontFamily: "Poppins",
                      fontSize: "3rem",
                    }}
                    variant="h2"
                  >
                    {Math.round(rating * 10) / 10}
                    </Typography>
                    <Stack direction="row" spacing={0.5} padding='0px'>
                    <Typography variant="body1" sx={{fontFamily: "Poppins", fontSize:'0.8rem'}}>
                        Out of 
                    </Typography>
                    <Typography variant="body1" sx={{fontFamily: "Poppins", fontSize:'0.8rem', fontWeight:'bold'}}> {ratingCount} reviews</Typography>
                    </Stack>
                    </Box>
                </Box>

            </Grid>
            <Grid item md>
              <Box
                sx={{
                  backgroundImage: `url(${pic})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",

                  minHeight: "75vh",
                }}
              />
            </Grid>
          </Grid>
     
      
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Typography
                  sx={{
                    "background-image":
                      "linear-gradient(52deg, #A00407, #ff5659)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "#ff000000",
                    fontFamily: "Helvetica,Arial,sans-serif",
                    fontSize: "2rem",
                    marginBottom: "40px",
                  }}
                  variant="h3"
                >
                  Some of our most popular courses
                </Typography>

                <Slider {...settings} width="300px">
                  {popularCourses &&
                    popularCourses.map((course) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <NewCourseCardViewAll
                          Course={course}
                          redirect={`/course/previewcourse?courseId=${course._id}`}
                        />
                      </div>
                    ))}
                </Slider>
                <Link
                  href="/course"
                  sx={{
                    color: "#A00407",
                    fontFamily: "Helvetica,Arial,sans-serif",
                    fontSize: "1.2rem",
                    marginTop: "40px",
                  }}
                  variant="h3"
                  underline="none"
                >
                  View all
                </Link>
              </Box>
         
        </Container>
        </Box>
<div>
        <Dialog  
         fullWidth
         fullScreen={fullScreen}
         open={OpenContract}
         aria-labelledby="responsive-dialog-title">
         <DialogTitle>
         Contract Agreement
         </DialogTitle>
        <DialogContentText margin='10px '>
        by accepting this contract you are agreeing on Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, placeat culpa. Est quas magnam dicta, doloremque architecto nesciunt fuga autem quisquam dolorem consequuntur ad ratione necessitatibus magni! Ipsa, dolorem! Dolorum?.
        </DialogContentText>
        <DialogActions>
        <Button onClick={handleAgree} >
             Agree
           </Button>
        </DialogActions>  
        </Dialog>


       <Dialog
         fullWidth
         fullScreen={fullScreen}
         open={flag}
         aria-labelledby="responsive-dialog-title"
       >
         
         <DialogContent >
         <Stack spacing = {1}>
         <h3>Please fill in the rest of your info</h3>
         <TextField
           required
           id="outlined-required"
           label="Firstname"
           fullWidth 
           onChange={(e) => setFirstname(e.target.value)}
           value={Firstname}
         />
         <TextField
           required
           id="outlined-required"
           label="Lastname"
           onChange={(e) => setLastname(e.target.value)}
           value={Lastname}
           fullWidth 
         />

        <TextField
        id="standard-password-input"
        label= "New Password"
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={Password}
        fullWidth
          />
    
         <FormControl size = 'small' fullWidth = 'false'>
         <InputLabel id="demo-simple-select-label">Gender</InputLabel>
         <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           label='Gender'
           onChange={(e) => setGender(e.target.value)}
           value={Gender}
         >
           <MenuItem value={'Male'}>Male</MenuItem>
           <MenuItem value={'Female'}>Female</MenuItem>
           <MenuItem value={''}></MenuItem>
          </Select>
          </FormControl>
          <Typography>By creating an account, I agree to the <Link href='/termsandconditions'>Terms and conditions </Link>
          </Typography>
          {error && <Alert severity="error">
          {error}
          </Alert>}    
 
          </Stack>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleEdit} autoFocus>
             Edit info
           </Button>
         </DialogActions>
        
       </Dialog>
       </div>
     
    </div>
  );
};

export default InstructorHome;
