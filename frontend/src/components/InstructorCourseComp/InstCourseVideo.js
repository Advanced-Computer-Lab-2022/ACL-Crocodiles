import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, TextField, Box, Stack, Paper, Alert, Skeleton } from "@mui/material"
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
        
       
      <Paper elevation={3} sx={{maxWidth:"900px", borderRadius:"16px", alignItems:"center", display:"flex", flexDirection:"column", padding:"16px"}}>
            <Typography variant="h4">Preview Video</Typography>
            {embedLink && <iframe width= "800px" height= "450px"src={embedLink}></iframe>}
            {!embedLink && <Skeleton variant="rectangular" width= "800px" height= "450px"/>}
      </Paper>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
      </Box>
    )
}
export default InstCourseVideo