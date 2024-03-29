import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import bgImage from "../images/course.jpg";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import GradeTwoToneIcon from "@mui/icons-material/GradeTwoTone";
import { lineHeight } from "@mui/system";
import { useSelector } from "react-redux";
import {
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Alert
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import LinearWithLabel from "./LinearProgressWithLabel";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"; import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const NewCourseCard = ({ user, Course, redirect }) => {
  const DiscountEndDate = new Date(Course.DiscountEndDate);
  console.log(Course.Discount);
  const country = useSelector((state) => state.country.value);
  const [progress, setProgress] = useState(0);
  const [progressReady, setProgressReady] = useState(false);
  const [refundrequest, setRefundRequest] = useState(true)
  const [error, setError] = useState(null)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Open, setOpen] = useState(false)
  const [alertvisibilty, setAlertVisibility] = useState(false)
  const [success, setSuccess] = useState('')
  const [CourseID, setCourseID] = useState(Course._id)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  let fetchProgress;
console.log(user)

  if (Course.Discount != null && Course.Discount != undefined)
    var discountRate = 1 - Course.Discount / 100;
  else var discountRate = 1;
  var newPrice = Course.Price * discountRate;

  if (country.rate)
    var newPrice =
      Math.round(Course.Price * country.rate * discountRate * 100) / 100;
  useEffect(() => {

    const CheckRequest = async () => {
      const response = await fetch("/api/trainee/page/checkrequest/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }, body: JSON.stringify({
          CourseID: Course._id,
        }),
      })
      const json = await response.json()
      if (response.ok) {
        console.log(json)
        setRefundRequest(false)
      }
      if (!response.ok) {
        setRefundRequest(true)
      }
      console.log(refundrequest)
  
    }

    if(user.Type=="Trainee"){
     fetchProgress = async () => {
      await fetch("/api/trainee/page/getProgress/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          cid: Course._id,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setProgress(data.Progress * 100);
          setProgressReady(true);
        });
    };
    CheckRequest()
    
  fetchProgress();

  }

  else{
    if(user.Type=="Corporate"){
     fetchProgress = async () => {
      await fetch("/api/corpTrainee/page/getProgress/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          cid: Course._id,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setProgress(data.Progress * 100);
          setProgressReady(true);
        });
    };
    
  fetchProgress();

  }

  }

  console.log(refundrequest)


  }, [user]);

  const requestRefund = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/trainee/page/requestrefund',
      {
        body: JSON.stringify({ CourseID: Course._id, TraineeUsername: user.Username, CourseTitle: Course.Title }), method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-type': 'application/json',
        }
      })
    const json = await response.json()
    if (response.ok) {
      console.log('ok')
    }
    if (!response.ok) {
      setError(json)
      console.log('not')
    }

  }

  const handleOpenProblem = async (e) => {
    e.preventDefault()
    setOpen(true)
  }

  const reportProblem = async (Title, Description, CourseId) => {
    const response = await fetch('/api/trainee/page/reportProblem', {
      method: 'POST', headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title, description, CourseID })
    })
    const json = await response.json();
    console.log(json)
    if (!response.ok) {
      setError(json.error)

    }
    if (response.ok) {
      setOpen(false)
      setAlertVisibility(true)
      setSuccess('Problem Submitted Successfully')

    }
  }

  const handleProblem = async (e) => {
    e.preventDefault();
    await reportProblem(title, description, CourseID)
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: "1",
      }}
    >
      <CardActionArea
        onClick={() => {
          window.location.href = redirect;
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={bgImage}
          alt="course photo"
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", flex: "1" }}
        >
          <Typography gutterBottom variant="h5" component="div" sx={{
            "background-image":
              "linear-gradient(52deg, #A00407, #ff5659)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "#ff000000",
            fontSize: "2rem",
            fontFamily: "Poppins",
          }}>
            {Course.Title}
          </Typography>

          <Box
            marginBottom={"1.35em"}
            sx={{ display: "flex", flexDirection: "column", flex: "1" }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              marginBottom={"1.35em"}
              sx={{
                height: "40px",
                display: "-webkit-box",
                wordBreak: "break-word",
                overflow: "hidden",
                "-webkit-line-clamp": "2",
                "-webkit-box-orient": "vertical",
              }}
            >
              {Course.Summary}
            </Typography>
          </Box>

          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography
                        sx={{ alignItems: "center", lineHeight: "0.5" }}
                      >
                        {<GradeTwoToneIcon sx={{ color: "rgb(233 176 0)" }} />}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        color="Black"
                        fontWeight={700}
                        sx={{ alignItems: "center" }}
                      >
                        &nbsp;{Math.round(Course.Rating * 10) / 10}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    &nbsp;{Course.Hours} hrs
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        {progressReady && user && user.Type!=="Instructor" && <LinearWithLabel progress={progress} />}

      </CardActionArea>

      {refundrequest && progress <= 50 && user && user.Type === "Trainee" && <Button variant="contained"
        onClick={requestRefund} sx={{ margin: '10px', "background-image": "linear-gradient(52deg, #A00407, #ff5659)" }}>
        Request Refund
      </Button>}
    </Card>


  );
};

export default NewCourseCard;
