import React from 'react';
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box ,Stepper,Step,StepLabel,Button ,Typography,Paper ,TextField, stack,Autocomplete,Grid,styled,IconButton} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {useSelector} from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'white'
        : 'white',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
      display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


const AddContent = ({subtitles, setSubtitles,setTotalHours,totalHours}) => {
  const [subtitle_title, setSubtitle_title] = useState(null);
  const [hours, setHours] = useState(null);
  const [videoTitle, setVideoTitle] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoDescription, setVideoDescription] = useState('');
const [subError,setSubError] = useState([null,null,null,null]);
const [showCreateSub,setShowCreateSub] = useState(true);
const [showAddVideo,setShowAddVideo] = useState(false);
const [subIndex,setSubIndex] = useState(0);


  const handleCreateSub = () =>{
    let can=true;
    let t=subError;
    if(!subtitle_title || subtitle_title.trim().length === 0 ){
      t[0]='Enter a Title for the subtitle'
      can=false;
    }else{
      t[0]=null;
    }
    if(!hours ){
      t[1]='Enter total hours of the subtitle'
      can=false;
    }else{
      if(hours<0){
        t[1]='Enter a number greater than 0' 
        can=false;
      }else{

        t[1]=null;
      }
    }
    setSubError([...t])
    if(can){

      const sub = {Title:subtitle_title, Hours:hours, Videos:[], Exercises:[]}
      const temp = subtitles
      temp.push(sub)
      console.log(temp)
      setSubtitles([...temp])
      console.log(totalHours+hours)
      setTotalHours(parseInt(totalHours)+parseInt(hours))
     
      setShowCreateSub(false)
      setShowAddVideo(true)
      setSubIndex(temp.length-1)
      
    }
    
  }
const handleAdd2 = (i)=>{
  setSubIndex(i);
  setShowCreateSub(false)
  setShowAddVideo(true)
  setSubtitle_title(subtitles[i].Title)

}
  const handleAddVideo = () =>{
    let can=true;
    let t=subError;
    if(!videoTitle || videoTitle.trim().length === 0 ){
      t[2]='Enter a Title for the video'
      can=false;
    }else{
      t[2]=null;
    }
    var url = videoUrl;
    if (url != undefined && url.trim().length !== 0 && url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
          console.log('boooo')
          t[3]=null;
        }
        else {
          t[3]='Enter a valid (youtube embed) Link for your video'
          can = false;
        }
      }
      else {
        t[3]='Enter a valid (youtube embed) Link for your video'
        can = false;
      }
      console.log(t)
    setSubError([...t])
    if(can){
      const video = {Title:videoTitle, url:videoUrl, Description:videoDescription}
  const temp = subtitles
console.log(subIndex)
  temp[subIndex].Videos.push(video)
  console.log(temp)

      setSubtitles([...temp])
      // videos
      setShowCreateSub(false)
      setShowAddVideo(true)
      setVideoTitle('')
      setVideoUrl('')
      setVideoDescription('')

    }


  }
  const handleDelete =(i)=>{
    setTotalHours(parseInt(totalHours)-parseInt(subtitles[i].Hours));
    let x =subtitles
    x.splice(i,1);
    setSubtitles(x);
    if(x.length!==0){
      setSubIndex(x.length-1)
      setSubtitle_title(subtitles[x.length-1].Title)
      setShowCreateSub(false);
      setShowAddVideo(true);
    }
    else{
      setSubIndex(0)
      setSubtitle_title(null)
      setShowCreateSub(true);
      setShowAddVideo(false);
    }
   
  } 
  const handleDeleteVideo = (i,j)=>{
    let x =subtitles
    x[i].Videos.splice(j,1);
    setSubtitles([...x])
  }
  // useEffect(()=>{

  // },[setSubtitles])
    return (
        <Grid container sx={{marginTop:'40px', marginBottom:'40px'}} >
        <Grid item xs={8} sx={{display:'flex', flexDirection:'column'}}>
        { showCreateSub && <>
        <TextField label="Title" variant="standard" error={subError[0]} helperText={subError[0] ? `${subError[0]}` : ' '}  value={subtitle_title} onChange={(e)=>setSubtitle_title(e.target.value)}  margin="normal" sx={{ width: 400 }} />
        <TextField type='number' label="total hours" variant="standard" error={subError[1]} helperText={subError[1] ? `${subError[1]}` : ' '} value={hours} onChange={(e)=>setHours(e.target.value)}  margin="normal" sx={{ width: 400 }} />
        <Button  onClick={handleCreateSub} sx={{width:'fit-content'}}>+ Create subtitle</Button>
        </>}
       { showAddVideo && <>
       <Typography  sx={{fontSize:'1.3rem',fontWeight:'500'}}>{subtitle_title}:</Typography> 
       <TextField label={`Video Title`} variant="standard" error={subError[2]} helperText={subError[2] ? `${subError[2]}` : ' '}  value={videoTitle} onChange={(e)=>setVideoTitle(e.target.value)}   margin="normal" sx={{ width: 400 }}/>
          <TextField label={`Video URL (Embed)`} variant="standard" error={subError[3]} helperText={subError[3] ? `${subError[3]}` : ' '}  value={videoUrl} onChange={(e)=>setVideoUrl(e.target.value)}  margin="normal" sx={{ width: 400 }}/>
          <TextField label="Video Description (optional)" variant="standard"  value={videoDescription} onChange={(e)=>setVideoDescription(e.target.value)}   margin="normal" multiline maxRows={4} sx={{ width: 400 }}/>
   
          <Button onClick={handleAddVideo} sx={{width:'fit-content'}}>+ Add Video</Button>
          <Typography sx={{margin:'20px',fontWeight:'500'}}>OR</Typography> 
          <Button sx={{width:'fit-content'}} onClick={()=>{setShowCreateSub(true);setShowAddVideo(false)}}>Create new subtitle</Button></>}
        </Grid>
        <Grid item xs={4} sx={{ border: 1,maxHeight:'400px',overflowY:'auto' }}>
        <Typography sx={{ mt: 2, mb: 1 , textAlign:'center' }}>
            Subtitle preview
          </Typography>

         { subtitles&& subtitles.map((sub,i)=><Accordion >
        <AccordionSummary sx={{}} aria-controls="panel1d-content" id="panel1d-header">
        
          <Typography>{sub.Title}</Typography>
          <Box>
  
            <IconButton onClick={()=>{handleDelete(i)}}>
              <DeleteIcon sx={{fontSize:'1.1rem'}}/>
            </IconButton>
          </Box>

     
        </AccordionSummary>
        <AccordionDetails>
          
        { sub.Videos&& sub.Videos.map((vid,j)=>
       <Typography>
 
           <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                              marginBottom:'15px',
                              justifyContent:'space-between',
                              marginLeft:'22px'
                  
                            }}
                          >
                                   <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <OndemandVideoIcon htmlColor="grey" />
                            <span style={{ color: "grey" }}>
                              &nbsp;  {vid.Title}
                            </span>
                       </div>
                            
                       <IconButton onClick={()=>handleDeleteVideo(i,j)}>
                       <RemoveCircleOutlineIcon htmlColor="#A00407" sx={{fontSize:'1rem'}}/>
                        </IconButton>
                       
                          </div>

       </Typography>) }
       <Button onClick={()=>handleAdd2(i)} sx={{width:'fit-content',fontSize:'0.7rem', marginLeft:'22px'}}>+ Add Video</Button>
        </AccordionDetails>
      </Accordion>)}
   
     
       
        </Grid>

      </Grid>

    );
};

export default AddContent;