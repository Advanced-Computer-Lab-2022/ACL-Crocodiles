import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from "react-router-dom"


export default function TakeTestWidget({ examid,courseid, type }) {

  let navigate = useNavigate()
  async function handleSubmit() {

    navigate('/viewExam/'+ courseid+'/'+ examid)

  }



  return (
    <ButtonBase onClick={handleSubmit}>
      <Box
        sx={{
          width: "200px",
          height: "200px",
          display: "flex",
          background: "#857df6",
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
            <QuizOutlinedIcon sx={{ color: "#f0c0ff" }} fontSize="large" />
          </Box>
          <Typography variant="h4" sx={{ color: "white" }} textAlign="center">
            {" "}
            Take Test
          </Typography>
        </Stack>


      </Box>
    </ButtonBase >
  )
}
