import { Avatar, Paper, Stack, Typography, Box, Grid, Button, Alert, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { useAuthContext } from "../hooks/useAuthContext";

const MyProblemCard = ({Problem}) => {
    const { user } = useAuthContext();
    const [problemTitle, setProblemTitle] = useState(Problem.Title);
    const [problemDescription, setProblemDescription] = useState(Problem.Description);
    const [problemType, setProblemType] = useState(Problem.Type);
    const [problemStatus, setProblemStatus] = useState(Problem.Status);
    const [courseTitle, setCourseTitle] = useState(Problem.course_title);
    const [submitterUsername, setSubmitterUsername] = useState(Problem.submitter_username);
    const [problemComments, setProblemComments] = useState(Problem.Comments);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [newComment, setNewComment] = useState("");
    console.log(Problem._id);
    
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (user && user.Type === "Trainee"){
            const body = {
                problemID: Problem._id,
                comment: newComment,
            }
            const response = await fetch('/api/trainee/page/addProblemComment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(body)
            })
            const json = await response.json()
            if (response.ok) {
                setSuccess("Comment Added Successfully");
                setError(null);
                setProblemComments([...problemComments, newComment]);
                setNewComment("");
            }
            if (!response.ok) {
                setError(json.error);
                setSuccess(null);
            }
        }
        else if (user && user.Type === "Instructor"){
            const body = {
                problemID: Problem._id,
                comment: newComment,
            }
            const response = await fetch('/api/instructor/addProblemComment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(body)
            })
            const json = await response.json()
            if (response.ok) {
                setSuccess("Comment Added Successfully");
                setError(null);
                setProblemComments([...problemComments, newComment]);
                setNewComment("");
            }
            if (!response.ok) {
                setError(json.error);
                setSuccess(null);
            }
        }
        else if (user && user.Type === "Corporate"){
            const body = {
                problemID: Problem._id,
                comment: newComment,
            }
            const response = await fetch('/api/corpTrainee/page/addProblemComment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(body)
            })
            const json = await response.json()
            if (response.ok) {
                setSuccess("Comment Added Successfully");
                setError(null);
                setProblemComments([...problemComments, newComment]);
                setNewComment("");
            }
            if (!response.ok) {
                setError(json.error);
                setSuccess(null);
            }
        }
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
            <Box sx={{ minHeight:'180px', width:'350px', backgroundColor:"#e0e0e0", padding:'8px', borderRadius:'2px',
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
                    <Typography variant="h6" > Your follow-up comments: </Typography>
                    {problemComments.map((comment) => (
                        <Box sx={{ minHeight:'50px', minWidth:'350px', backgroundColor:"#e0e0e0", padding:'8px', borderRadius:'2px',
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', 
                    }}> 
                        <Typography variant="body1"> {comment} </Typography>
                        </Box>
                    ))}
                </Stack>
            }
                {problemStatus && problemStatus !== 'resolved' && <Stack direction="column" spacing={2}>
                    <Typography variant="h6" > Add a follow-up comment: </Typography>
                    <TextField label="Comment" variant="outlined" value={newComment} onChange={(e) => setNewComment(e.target.value)}  />
                    <Button onClick={handleAddComment} variant="contained" sx={{width:"30%"}}>
                        <Typography variant="body1" sx={{fontFamily:'Poppins',fontSize:'0.7rem'}}>Submit</Typography>
                    </Button>
                </Stack>}
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            </Stack>
        </Paper>
    )
}
export default MyProblemCard;
