import { Box, Stack, Typography, TextField, Button, Alert } from "@mui/material"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router-dom";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { width } from "@mui/system";

const InstSubtitles = ({Subtitles}) => {
    const {user} = useAuthContext();
    const [subtitles, setSubtitles] = useState(null);
    const [subtitleTitle, setSubtitleTitle] = useState("");
    const [subtitleHours, setSubtitleHours] = useState(0);
    const [newAddFlag, setNewAddFlag] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const {courseid} = useParams()

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
                console.log('newwsss subtitles', json);
                setSubtitles(json);
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
            console.log('subtitle', json);
            //setSubtitles(subtitles.push(json._id));
            setNewAddFlag(!newAddFlag);
            setSuccess("Subtitle Added Successfully");
            setError(null);
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
            {subtitles && subtitles.map(subtitle => (
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
                            <Typography variant="h5" >{subtitle.Hours}</Typography>
                        </AccordionDetails>
                    </Accordion>
            ))}
        {/* <Accordion
            >
            <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <Typography variant="h3">Add a Subtitle</Typography>
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
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
            </Stack>
            </AccordionDetails>
        </Accordion> */}
            </Stack>
        </Box>
    )
}
export default InstSubtitles