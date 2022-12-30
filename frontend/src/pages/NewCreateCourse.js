import React from 'react';
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box ,Stepper,Step,StepLabel,Button ,Typography,Paper ,TextField, stack,Autocomplete,Grid,styled} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {useSelector} from "react-redux"
import EnterCourseDetails from '../components/EnterCourseDetails';
import AddContent from '../components/AddContent';
import NewCourseCardViewAll from '../components/NewCourseCardViewAll';
const steps = ['Enter Course Details', 'Add course Content', 'Create Course'];




const NewCreateCourse = () => {
    const { user} = useAuthContext();
    const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
const country = useSelector((state)=>state.country.value)
const [title, setTitle] = useState(null);
const [subject, setSubject] = useState(null);
const [price, setPrice] = useState(null);
const [description, setDescription] = useState(null);
const [previewLink, setPreviewLink] = useState(null);
const [error, setError] = useState([null,null,null,null,null]);
const [subtitles, setSubtitles] = useState([]);
const [videos, setVideos] = useState([]);
const [totalHours, setTotalHours] = useState(0)

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let t = error
    let can = true;
    if(activeStep==0){
      if(!title ||  title.trim().length === 0){
        t[0]='Enter a Title for your course'
        can = false;
      }
      else{
        setTitle(title.trim())
        t[0]=null;
      }
      if(!subject){
        t[1]='choose a subject'
        can = false;
      }
      else{
        t[1]=null;
      }

      if(!price || price<0 || price>500){
        t[2]='Enter valid course price (between 0 and 500)'
        can = false;
      }
      else{
        t[2]=null;
      }
      if(!description || description.trim().length === 0){
        t[3]='Enter a description for your course'
        can = false;
      }
      else{
        t[3]=null;
        setDescription(description.trim())
      }

        var url = previewLink;
        if (url != undefined && url != '' && url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
              t[4]=null;
            }
            else {
              t[4]='Enter a valid (youtube embed) Link for your video'
              can = false;
            }
        
    
      }   else {
        t[4]='Enter a valid (youtube embed) Link for your video'
        can = false;
      }
      console.log(t)
      setError([...t])
    }



    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
if(can){
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
}
   
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  

    return (
            <Box sx={{ alignItems:"center", justifyContent:"center",display:"flex" , height:'100%', margin:'-20px'}}>
         
              <Box sx={{width: '75%' ,marginTop:'30px' ,marginBottom:'10px'} }>
              <Paper >
              <Box sx={{width: '75%' ,paddingTop:'30px',justifyContent:"center",marginLeft:'auto',marginRight:'auto', display:'flex',flexDirection:'column',    'justify-content': 'flex-start',minHeight:'520px'} }>
      <Stepper  activeStep={activeStep}sx={{marginBottom:'10px'}} >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
        
       
        {activeStep==0 &&  
  
         <EnterCourseDetails title={title} setTitle={setTitle} subject={subject} setSubject={setSubject} price={price} setPrice={setPrice}  description={description} setDescription={setDescription} previewLink={previewLink} setPreviewLink={setPreviewLink} error={error}/>
          }
                  {activeStep==1 &&  
        
          <AddContent setSubtitles={setSubtitles} setVideos={setVideos} subtitles={subtitles} videos={videos} setTotalHours={setTotalHours} totalHours={totalHours}/>
          }
       
        </React.Fragment>
      )}
              {activeStep==2 && 
              <Box sx={{marginLeft:'auto',marginRight:'auto', paddingTop:'40px'}}>
               <NewCourseCardViewAll Course={{Title:title,Subject:subject,Price:price, Summary:description, Subtitle:subtitles,Discount:0,Hours:totalHours}}/> 
               </Box>}
             
         </Box>
              
         <Box sx={{ display:'grid',alignContent:'center', marginBottom:'20px',width: '75%',marginLeft:'auto',marginRight:'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom:'20px', pt: 2 }}>
        
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Create' : 'Next'}
            </Button>
        
          </Box>
          </Box>
         
            </Paper>
      </Box>

    </Box>
    );
};

export default NewCreateCourse;