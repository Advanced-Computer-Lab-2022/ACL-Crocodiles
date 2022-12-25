import { Box, Stack, Typography, TextField, Button } from "@mui/material"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router-dom";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { width } from "@mui/system";

const InstSubtitles = ({Subtitles}) => {
    const {user} = useAuthContext();
    const [subtitles, setSubtitles] = useState(Subtitles);
    const [subtitleTitle, setSubtitleTitle] = useState("");
    const [subtitleHours, setSubtitleHours] = useState(0);
    const [newAddFlag, setNewAddFlag] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const {courseid} = useParams()
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDesc, setVideoDesc] = useState('');
    const [videoURL, setVideoURL] = useState('');
    const [errorVid, setErrorVid] = useState(null);
    const [successVid, setSuccessVid] = useState(null);

    useEffect(() => {
        const fetchSubtitles = async () => {
            const response = await fetch('/api/Instructor/getmysubtitles/'+ courseid, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            if (!response.ok) {
                console.log(json.error);
                setError(json.error);
            }
            if (response.ok) {
                setSubtitles(json);
                console.log(subtitles)
                setError(null);
            }
        }
        fetchSubtitles();
    }, [newAddFlag])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/Instructor/createsubtitle/'+courseid, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                subtitle: subtitleTitle,
                subHours: parseInt(subtitleHours),
            })
        })
        const json = await response.json();
        if (!response.ok) {
            console.log(json.error);
            setError(json.error);
            setSuccess(null);
        }
        if (response.ok) {
            //setSubtitles(subtitles.push(json._id));
            setNewAddFlag(!newAddFlag);
            setSuccess("Subtitle Added Successfully");
            setError(null);
        }
    }
    const handleAddVideo = async (temp) => {
        const bodyyody = {videoTitle,videoDesc,videoURL,subId:temp}
        console.log(bodyyody)
        const response = await fetch('/api/instructor/createvideo',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(bodyyody)
        })
        
        const json = await response.json();
        console.log(json)
        if (!response.ok) {
            console.log(json.error);
            setErrorVid(json.error);
            setSuccessVid(null);
        }
        if (response.ok) {
            setSuccessVid("Video Added Successfully");
            setErrorVid(null);
        }
    }

    return (
        <Box
        sx={{
            margin: "30px",
            padding: "10px",
        }}
        >
            <Typography variant="h3" >Subtitles: </Typography>
            <Stack direction="column" spacing={1} sx={{width: "75%", padding:"15px"}}>
            {subtitles && subtitles.map((subtitle) => (
                    <Accordion
                    sx={{borderRadius:"20px"}}>
                        <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography variant="h5" >{subtitle.Title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6.5" >Hours: {subtitle.Hours}</Typography>

                            <Accordion sx={{borderRadius:"15px"}}>
                                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography variant="h7" >View Subtitle Videos</Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    {subtitle.Videos && subtitle.Videos.map((video) => (
                                        <div>                                           
                                            <Typography variant="h8">Title: {video.Title}</Typography>
                                        </div>
                                    ))}
                                    <Accordion>
                                    <AccordionSummary expandIcon={<AddIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography variant="h9">Add a Video</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack direction="column" spacing={1} >
                                            <Typography variant="h10">Title: </Typography>
                                            <TextField
                                                value={videoTitle}
                                                onChange={(e) => setVideoTitle(e.target.value)}
                                                label="Video Title"
                                                type="text"/>
                                            <Typography variant="h10">Video Desc: </Typography>
                                            <TextField
                                                value={videoDesc}
                                                onChange={(e) => setVideoDesc(e.target.value)}
                                                label="Video Description"
                                                type="text"/>
                                            <Typography variant="h10">Video URL: </Typography>
                                            <TextField
                                                value={videoURL}
                                                onChange={(e) => setVideoURL(e.target.value)}
                                                label="Video URL"
                                                type="text"/>
                                            <Button variant="contained" color="primary" onClick={()=>handleAddVideo(subtitle._id)}>Add</Button>
                                            {errorVid && <Typography variant="h10" color="error">{errorVid}</Typography>}
                                            {successVid && <Typography variant="h10" component="successComp">{successVid}</Typography>}
                                         </Stack>
                                    </AccordionDetails>
                                    </Accordion>
                                </AccordionDetails>
            
                            </Accordion>
                            <Accordion sx={{borderRadius:"15px"}}>
                                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography variant="h7" >View Subtitle Exercises</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {subtitle.Exercises && subtitle.Exercises.map((exercise) => (
                                        <Typography variant="h8">Title: {exercise.Title}</Typography>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>
            ))}
        <Accordion
            >
            <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <Typography variant="h4">Add a Subtitle</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Stack direction="column" spacing={1} >
                <Typography variant="h5">Title: </Typography>
                <TextField
                value={subtitleTitle}
                onChange={(e) => setSubtitleTitle(e.target.value)}
                label="Subtitle Title"
                type="text"
                />
                <Typography variant="h5">Hours: </Typography>
                <TextField
                value={subtitleHours}
                onChange={(e) => setSubtitleHours(e.target.value)}
                label="Subtitle Hours"
                type="number"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>Add</Button>
                {error && <Typography variant="h5" color="error">{error}</Typography>}
                {success && <Typography variant="h5" color="success">{success}</Typography>}
            </Stack>
            </AccordionDetails>
        </Accordion>
            </Stack>
        </Box>
    )
}
export default InstSubtitles