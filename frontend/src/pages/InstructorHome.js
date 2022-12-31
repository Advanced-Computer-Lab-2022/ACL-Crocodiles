import { Grid, Typography, Link, Rating, Stack } from "@mui/material";
import { Box, Container } from "@mui/system";
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
    const [popularCourses, setPopularCourses] = useState(null);
    const [rating, setRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
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

  }, [user]);

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
    </div>
  );
};

export default InstructorHome;
