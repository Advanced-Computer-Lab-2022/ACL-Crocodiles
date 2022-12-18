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
import Toolbar from '@mui/material/Toolbar';
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { chooseRatingFilter } from '../Features/ratingFilter';
import { choosePriceFilter } from '../Features/priceFilter';
import { chooseSubjectFilter } from '../Features/subjectFilter';
const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const FilterDrawer = ({subjectOptions}) => {

     const currRatingRange = useSelector((state) => state.ratingFilter.value.range);
     const currPriceRange = useSelector((state) => state.priceFilter.value.range);
     const currSubject = useSelector((state) => state.subjectFilter.value.range);

     const [priceRange,setPriceRange] = useState(currPriceRange);
     const [ratingRange,setRatingRange] = useState(currRatingRange);
     const [subject,setSubject] = useState(currSubject);
     const dispatch = useDispatch();

     const handleRating = (e,data)=> {
      setRatingRange(data);
      dispatch(chooseRatingFilter({ range: data}))

    }
    const handlePrice = (e,data)=> {
      setPriceRange(data);
      dispatch(choosePriceFilter({ range: data}))

    }
    const handleSubject = (e,data)=> {
      setSubject(data);
      dispatch(chooseSubjectFilter({ label: data}))

    }
    return(
        <div>
           
<Drawer
        
        sx={{
            display:{xs:'none',md:'flex'},
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <Toolbar/>
        <DrawerHeader>
              <Box     width="100%" height="100%"  component={Stack} direction="column" justifyContent="center">
              <Typography style={{ fontWeight: 600,fontSize:'1.2rem' }} >  
                 Filter </Typography>
             </Box>
             
           
         </DrawerHeader>

         <Divider />
         <Box  sx={{padding:"5%"}}>
              <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
      }}>
          <SubjectOutlinedIcon sx={{paddingBottom:'5%'}} size="small" htmlColor='grey'/>
          <Typography sx={{paddingBottom:'5%'}}>&nbsp;Subject</Typography>
      </div>  
            
         
             
            <Autocomplete
  onChange={(e,data)=> {data?handleSubject(e,data.label):handleSubject(e,"")} }    
  
    // onBlur= {(e,data) => handleSubject(e,data)}     
    disablePortal
    id="combo-box-demo"
    options={subjectOptions}
    size="small"
    renderInput={(params) => <TextField {...params} label="Select a subject" />}/>
             </Box>
            
            <Divider />

            <Box  sx={{padding:"5%"}}>
            <div style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
}}>
    <MonetizationOnOutlinedIcon  size="small" htmlColor='grey'/>
  <Typography> &nbsp;Price</Typography>
</div>  
            
            <Slider
  getAriaLabel={() => 'range'}

  valueLabelDisplay="auto"
  min={0}
  max={500}
  value={priceRange}
  onChange={(e,data)=> {  setPriceRange(data);}}
  onChangeCommitted={(e,data)=> handlePrice(e,data)}
  marks={[{value:0,label:'0'},{value:500,label:'500'}]}
size="small"
/>
             </Box>

        <Divider />


        <Box  sx={{padding:"5%"}}>
        <div style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
}}>
    <StarOutlineOutlinedIcon size="small" htmlColor='grey'/>
    <Typography> &nbsp;Rating</Typography>
</div>  
            
            
            <Slider
  getAriaLabel={() => 'range'}

  valueLabelDisplay="auto"
  min={0}
  max={5}
  value={ratingRange}
  onChange={(e,data)=> { setRatingRange(data);}}
  onChangeCommitted={(e,data)=> {handleRating(e,data)}}

  step={0.1}
  marks={[{value:0,label:'0'},{value:5,label:'5'}]}
size="small"
/>
             </Box>

        <Divider />

        </Drawer>

</div>
    )
}

export default FilterDrawer