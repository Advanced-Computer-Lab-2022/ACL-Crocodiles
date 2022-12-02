import React from 'react'
import {useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AssignmentIcon from '@mui/icons-material/Assignment';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const TraineeDrawer = ({ subtitles, arrowHandler,open,vidHandler,exerciseHandler}) => {

    const [subOpen,setSubOpen] = useState([]);
    const [ExOpen,setExOpen] = useState([]);
    const [VidOpen,setVidOpen] = useState([]);


  
      const handleSubClick = (id) =>{
        const currIndex = subOpen.indexOf(id);
        const newHook = [...subOpen];
        if(currIndex==-1){
          newHook.push(id);
        }
        else{
          newHook.splice(currIndex,1);
        }
        setSubOpen(newHook);
      
      }
      const handleExClick = (id) =>{
        const currIndex = ExOpen.indexOf(id);
        const newHook = [...ExOpen];
        if(currIndex==-1){
          newHook.push(id);
        }
  
        else{
          newHook.splice(currIndex,1);
        }
        setExOpen(newHook);
      
      }
  
      const  handleVidClick = (id) =>{
        const currIndex = VidOpen.indexOf(id);
        const newHook = [...VidOpen];
        if(currIndex==-1){
          newHook.push(id);
        }
  
        else{
          newHook.splice(currIndex,1);
        }
        setVidOpen(newHook);
      
      }

    return(
        <Drawer
        
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <Grid container 
              item >
             <Grid item xs={9}>
              <Box     width="100%" height="100%"  component={Stack} direction="column" justifyContent="center">
              <Typography style={{ fontWeight: 600 }} >  
                 Course Content </Typography>
             </Box>
             
           
            </Grid>
            <Grid item xs>
              <Box align='right' 
               width="100%" height="100%" 
                component={Stack} direction="column" justifyContent="end">
                <IconButton  onClick={arrowHandler} >
                {useTheme().direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton></Box>
            </Grid>
    
            </Grid>
           
         </DrawerHeader>
            <Divider />
            <List>
              
              {subtitles && subtitles.map((subtitle) => (
                <div>
                  <ListItemButton  onClick={()=> handleSubClick(subtitle._id)}>
                  <ListItemText primary={subtitle.Title} />
                  {subOpen.indexOf(subtitle._id)!==-1 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={subOpen.indexOf(subtitle._id)!==-1 } timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={()=> handleVidClick(subtitle._id)} sx={{ pl: 4 ,pr:6 }}>
                <ListItemIcon>
                  <OndemandVideoIcon />
                </ListItemIcon>
                <ListItemText primary="Videos" />
                {VidOpen.indexOf(subtitle._id)!==-1 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={VidOpen.indexOf(subtitle._id)!==-1 } timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {subtitle.Videos && subtitle.Videos.map((video) => (
              <ListItemButton  onClick={()=> vidHandler(video)} sx={{ pl: 8 }}>
                <ListItemText primary={video.Title} />
              </ListItemButton>
                ))}
              </List>
              </Collapse>
          
              <ListItemButton  onClick={()=> handleExClick(subtitle._id)} sx={{ pl: 4 ,pr:6} }>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Exercises" />
                {ExOpen.indexOf(subtitle._id)!==-1 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={ExOpen.indexOf(subtitle._id)!==-1 } timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {subtitle.Exercises && subtitle.Exercises.map((exercise) => (
              <ListItemButton  onClick={()=> exerciseHandler(exercise)} sx={{ pl: 8 }}>
                <ListItemText primary={exercise.Title} />
              </ListItemButton>
                ))}
              </List>
              </Collapse>
            </List>
          </Collapse>
               </div>
              ))}
            </List>
            
        </Drawer>

    )
}

export default TraineeDrawer