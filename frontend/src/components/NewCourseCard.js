import React from 'react';
import Card from  '@mui/material/Card';
import Box from  '@mui/material/Box';
import Grid from  '@mui/material/Grid';
import CardMedia from  '@mui/material/CardMedia';
import CardContent from  '@mui/material/CardContent';
import Typography from  '@mui/material/Typography';
import bgImage from "../images/course.jpg";
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import GradeTwoToneIcon from '@mui/icons-material/GradeTwoTone';
import { lineHeight } from '@mui/system';
import {useSelector} from 'react-redux'
import { CardActionArea } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const NewCourseCard = ({Course,redirect}) => {
    const DiscountEndDate = new Date(Course.DiscountEndDate)
    console.log(Course.Discount)
    const country = useSelector((state) => state.country.value);
    if (Course.Discount != null && Course.Discount!=undefined )
    var discountRate = 1 - (Course.Discount / 100)
else
    var discountRate = 1
var newPrice = Course.Price * discountRate

if (country.rate)
    var newPrice = Math.round(Course.Price * country.rate * discountRate * 100) / 100
var oldPrice = Math.round(Course.Price * country.rate * 100) / 100

    return (
        <div>
            <Card >
            <CardActionArea  onClick = {() => {window.location.href=redirect}}>
            <CardMedia
          component="img"
          height="180"
          image={bgImage}
          alt="course photo"
        />
        <CardContent  >
          <Typography gutterBottom variant="h5" component="div">
          {Course.Title}
          </Typography>
          <Box minHeight={60}    marginBottom= {'1.35em'} >
          <Typography   variant="body2" color="text.secondary" marginBottom= {'1.35em'}  sx={{ display:'-webkit-box',wordBreak: "break-word" ,overflow:'hidden',"-webkit-line-clamp":'3','-webkit-box-orient':'vertical'}}>
         
    
            {Course.Summary}
   


          </Typography>
          </Box>

    
      
     
        <Grid container 
  alignItems="center"  >
                  <Grid item xs={4} >
                    <Grid container>  
                    <Grid item xs={12} >
                   
            <Grid container 
  alignItems="center"  >
                  <Grid item >
                  <Typography sx={{alignItems:'center' ,lineHeight:'0.5'} 
}>
          { <GradeTwoToneIcon  sx={{color:'rgb(233 176 0)' }}/>}
          </Typography>
          </Grid>  
          <Grid item   >
            <Typography variant="body2" color="Black" fontWeight={700} sx={{alignItems:'center'}}>
            &nbsp;{Math.round(Course.Rating * 10) / 10}
          </Typography>
             
          </Grid>
        
       </Grid>
                    </Grid>
                     <Grid item xs={12} >
                    <Typography variant="body2" color="text.secondary" >
       &nbsp;{Course.Hours} hrs
        </Typography>
                    </Grid>
                  
                    </Grid>
                  
          </Grid>  
      
        
       </Grid>

       </CardContent >
       </CardActionArea>
       <LinearProgress variant="determinate" value={50} />
            </Card>
           
        </div>
    );
};

export default NewCourseCard;