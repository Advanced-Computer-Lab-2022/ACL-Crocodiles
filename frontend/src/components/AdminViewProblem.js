import { Avatar, Paper, Stack, Typography, Box, Grid, Button, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';

const AdminViewProblem = ({Problem}) => {
    const [problemTitle, setProblemTitle] = useState(Problem.Title);
    const [problemDescription, setProblemDescription] = useState(Problem.Description);
    const [problemType, setProblemType] = useState(Problem.Type);
    const [problemStatus, setProblemStatus] = useState(Problem.Status);
    const [courseTitle, setCourseTitle] = useState(Problem.course_title);
    const [submitterUsername, setSubmitterUsername] = useState(Problem.submitter_username);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [disabled2, setDisabled2] = useState(false);
    const [problemComments, setProblemComments] = useState(Problem.Comments);

    useEffect(() => {
        if (problemStatus === "unseen") {
            setDisabled(false);
        }
    }, [])
    
    const handleResolve = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/admin/resolveproblem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ problemid: Problem._id })
        })
        const json = await response.json()
        if (response.ok) {
            setSuccess("Successfully marked problem as resolved")
            setError(null)
            setProblemStatus("resolved")
            setDisabled(true);
            setDisabled2(true);
        }
        if (!response.ok) {
            setError("An error occurred")
            setSuccess(null)
        }
        console.log(problemTitle + " " + problemStatus + " " + success + " " + error)
    }

    const handlePending = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/admin/pendproblem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ problemid: Problem._id })
        })
        const json = await response.json()
        if (response.ok) {
            setSuccess("Successfully marked problem as pending")
            setError(null)
            setProblemStatus("pending")
            setDisabled(true);
            setDisabled2(false);
        }
        if (!response.ok) {
            setError("An error occurred")
            setSuccess(null)
        }
        console.log(problemTitle + " " + problemStatus + " " + success + " " + error)
    }

    return(
        <Paper elevation={1} sx={{borderRadius:'8px', margin:'16px', padding:'16px', minWidth:'400px', minHeight:'300px'}}>
            <Stack direction="column" spacing={2}>
            <Box sx={{ justifyContent:'space-between', display:'flex', flexDirection:'row'}}>
            <Stack direction="row" spacing={2}>
            <Avatar><PersonIcon /></Avatar>
            <Typography variant="h5">
                {submitterUsername}
            </Typography>
            </Stack>
            <Typography variant="h5">
                {problemStatus}
            </Typography>
            </Box>
            <Typography variant="h4" sx={{"background-image":
                        "linear-gradient(52deg, #A00407, #ff5659)",
                      "-webkit-background-clip": "text",
                      "-webkit-text-fill-color": "#ff000000",
                      fontSize: "2rem",
                      fontFamily: "Poppins",}}>
                {courseTitle}
            </Typography>
            <Box sx={{ minHeight:'180px', width:'350px', backgroundColor:"#dddddd", padding:'8px', borderRadius:'2px',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', 
            }}>
            <Typography variant="h5">
                Type: {problemType}
            </Typography>
            <Typography variant="h4" sx={{fontWeight:"bold"}}>
                {problemTitle}
            </Typography>
            <br />
            <Typography variant="body1">
                {problemDescription}
            </Typography>
            </Box>
            {problemComments && problemComments.length > 0 &&
                <Stack direction="column" spacing={1} >
                <Typography variant="h6" > Follow-up comments: </Typography>
                {problemComments.map((comment) => (
                    <Box sx={{ minHeight:'50px', minWidth:'350px', backgroundColor:"#d0d0d0", padding:'8px', borderRadius:'2px',
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', 
                }}> 
                    <Typography variant="body1"> {comment} </Typography>
                    </Box>
                ))}
            </Stack>
            }
            {problemStatus!=="resolved" &&
            <Stack direction="row" spacing={3} alignSelf='center'>
                <Button onClick={handleResolve} variant="contained" disabled={disabled2} sx={{backgroundColor:"#19B125"}}>Mark as resolved</Button>
                <Button onClick={handlePending} variant="contained" disabled={disabled} sx={{backgroundColor:"#F29339"}}>Mark as pending</Button>
            </Stack>}
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            </Stack>
        </Paper>
    )
}
export default AdminViewProblem
