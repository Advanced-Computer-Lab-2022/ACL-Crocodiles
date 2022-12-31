import React from 'react';
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box ,Stepper,Step,StepLabel,Button ,Typography,Paper ,TextField, stack,Autocomplete,Grid,styled} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {useSelector} from "react-redux"

const subjects = ['Programming languages','Web development','Data science and analytics','Business and leadership','Design and creativity','Personal development','Health and fitness','Education and teaching','Music and performing arts','Creativity and writing', 'Science and technology', 'Languages','Hobbies and interests','Career and job skills']

const EnterCourseDetails  = ({title,setTitle,subject,setSubject,price,setPrice,description, setDescription,previewLink,setPreviewLink,error}) => {

        return (
            <Box sx={{    display: 'flex',  width: 400,  alignItems: 'flex-start',flexDirection: 'column' }}>
            <TextField     error={error[0]} helperText={error[0] ? `${error[0]}` : ' '}label="Title" variant="standard"  value={title} onChange={(e)=>setTitle(e.target.value)} margin="normal" sx={{ width: 500,marginBottom:'30px' }}  />
              <Autocomplete  disablePortal onChange={(e,newValue)=>setSubject(newValue)}  value={subject} options={subjects} renderInput={(params) => <TextField {...params} label="Subject"  variant="standard"    margin="normal"   sx={{ width: 500,marginBottom:'30px' }} error={error[1]} helperText={error[1] ? `${error[1]}` : ' '}/>}/>
              <TextField error={error[2]} helperText={error[2] ? `${error[2]}` : ' '} label={`Price (USD)`}  type="number" variant="standard"margin="normal" value={price} onChange={(e)=>setPrice(e.target.value)} sx={{ width: 500 ,marginBottom:'30px'}}/>
              <TextField error={error[3]} helperText={error[3] ? `${error[3]}` : ' '} label="Description" variant="standard" margin="normal" value={description} onChange={(e)=>{setDescription(e.target.value)}} multiline maxRows={4} sx={{ width: 500,marginBottom:'30px' }}/>
              <TextField error={error[4]} helperText={error[4] ? `${error[4]}` : ' '} label="Course Preview video Link (Embed)" variant="standard"margin="normal"value={previewLink} onChange={(e)=>setPreviewLink(e.target.value)} sx={{ width: 500 ,marginBottom:'30px'}}/>
        
                 </Box>
        );

     
}

export default EnterCourseDetails;        