import { Grid, Typography, Link } from "@mui/material";
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
const CorpHome = () => {
  const [alert, setAlert] = useState(null);
  const [popularCourses, setPopularCourses] = useState(null);
  const [myCourses, setMyCourses] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    fetch("/api/guest/getMostPopularCourses", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPopularCourses(data))
      .catch((error) => {
        setAlert(error.message);
      });

    fetch("/api/corpTrainee/page/getMyCoursesLimited", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMyCourses(data))
      .catch((error) => {
        setAlert(error.message);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "white", margin: "-20px" }}>
      <Box>
        <Container
          sx={{ width: "100%", pl: "20px", pr: "20px", minHeight: "500px" }}
        >
          <Grid container spacing={3}>
            <Grid item>
              {user && (
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
                    Welcome back,
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "5rem",
                      textTransform: "capitalize",
                      fontFamily: "Poppins",
                      fontSize: "3rem",
                    }}
                    variant="h2"
                  >
                    {user.Username}
                  </Typography>
                </Box>
              )}
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
          <Grid container justifyContent="space-around">
            <Grid item>
              <Box
                marginBottom="40px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                width="320px"
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
                  Start where you left off
                </Typography>
                <Slider {...settings} width="300px">
                  {myCourses &&
                    myCourses.map((course) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <NewCourseCard
                          user={user}
                          Course={course}
                          redirect={`/Mycourses/course?courseId=${course._id}`}
                        />
                      </div>
                    ))}
                </Slider>
                {myCourses && myCourses.length != 0 ? (
                  <Link
                    href="/corpcourses"
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
                ) : (
                  <Box>
                    <Alert severity="info">
                      it looks like you are not enrolled in any course! Click
                      here to explore our courses
                    </Alert>
                    <Button href="/course">Explore</Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default CorpHome;
