import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, TextField, Box, Stack, Paper, Alert } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useParams } from "react-router-dom";

const InstCourseVideo = ({Video}) => {
    const {user} = useAuthContext();
    const [videoLink, setVideoLink] = useState("");
    const [embedLink, setEmbedLink] = useState(Video);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [flag, setFlag] = useState(false);
    const {courseid} = useParams();

    console.log('video', Video);
    console.log('embed', embedLink);
    const handleUpload = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/Instructor/uploadpreview/'+courseid, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                videoLink: videoLink,
            })
        })
        const json = await response.json();
        if (!response.ok) {
            console.log(json.error);
            setError(json.error);
        }
        if (response.ok) {
            console.log('video', json);
            setEmbedLink(json);
            setSuccess("Video Uploaded Successfully");
            setVideoLink("");
            setFlag(true);
            setError(null);
        }
    }
   

    return(
        <Box
            sx={{
                padding: "20px",
                borderRadius: "16px",
                minWidth: "853px",
            }}
        >
        {!embedLink &&
        <Accordion>
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h3">Upload Preview Video</Typography>
        </AccordionSummary>
        </Box>
        
        <AccordionDetails>
        <Stack
            direction="column"
            spacing={1}
            alignItems="center"
        >
          <TextField
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            label="Upload preview Video Embed Link Here"
            width="100%"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={
                    handleUpload
                }
                >
                Upload
            </Button>
        </Stack>
        </AccordionDetails>
      </Accordion>}
      {embedLink && 
      <Paper elevation={3} sx={{maxWidth:"900px", borderRadius:"16px", alignItems:"center", display:"flex", flexDirection:"column", padding:"16px"}}>
            <Typography variant="h4">Preview Video</Typography>
            <iframe width= "800px" height= "450px"src={embedLink}></iframe>
      </Paper>}
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
      </Box>
    )
}
export default InstCourseVideo