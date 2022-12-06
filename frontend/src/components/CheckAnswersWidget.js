import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import ButtonBase from '@mui/material/ButtonBase';

export default function CheckAnswersWidget() {

  return (
    <ButtonBase >
     <Box
      sx={{
        width: "200px",
        height: "200px",
        display: "flex",
        background: "#38acf3e3",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10%"
      }}
      
    >
      
        <Stack spacing={2}>
             <Box
          sx={{
            width: "100",
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
       <GradingOutlinedIcon  fontSize="large"  sx={{color:"rgb(149 255 242 / 87%)"}}/>
        </Box>
        <Typography variant="h4" sx={{ color: "white" }} textAlign="center">
          {" "}
          Solution
        </Typography>
      </Stack>
         
    
    </Box>
    </ButtonBase>
  )
}
