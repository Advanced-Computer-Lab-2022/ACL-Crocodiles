import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel'
export default function GradeWidget({per}) {

  return (
     <Box
      sx={{
        width: "200px",
        height: "200px",
        display: "flex",
        background: "#31c66f",
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
            alignItems: "end",
            justifyContent: "center"
          }}
        >
       {per!=null && <CircularProgressWithLabel per={per}/>}
        </Box>
        <Typography variant="h4" sx={{ color: "white" }} textAlign="center">
          {" "}
          Grade
        </Typography>
      </Stack>
      
    </Box>
  )
}
