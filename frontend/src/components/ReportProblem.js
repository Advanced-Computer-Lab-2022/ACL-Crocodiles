import { Accordion,Grid,DialogContent,Link, AccordionDetails, AccordionSummary, Alert, Box, Button, Dialog, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ReportIcon from '@mui/icons-material/Report';


const ReportProblem = ({courseid}) => {
    const {user} = useAuthContext();
    const [problemTitle, setProblemTitle] = useState("");
    const [problemDescription, setProblemDescription] = useState("");
    const [open,setOpen] = useState(false)
    const [problemType, setProblemType] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body1 = {
            Title: problemTitle,
            Description: problemDescription,
            courseId: courseid,
            type: problemType,
            Username: user.Username,
        }
        if (user && user.Type === "Trainee"){
            const response = await fetch('/api/trainee/page/reportProblem', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(body1)
            })
            const json = await response.json()
        if (response.ok) {
            setSuccess("Problem Reported Successfully");
            setError(null);
            setProblemTitle("");
            setProblemDescription("");
            setProblemType("");
            setOpen(false)
        }
        if (!response.ok) {
            setError(json);
            setSuccess(null);
        }
        }
        else if (user && user.Type === "Instructor"){
            const response = await fetch('/api/instructor/reportProblem', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(body1)
            })
            const json = await response.json()
        if (response.ok) {
            setSuccess("Problem Reported Successfully");
            setError(null);
            setProblemTitle("");
            setProblemDescription("");
            setProblemType("");
            setOpen(false)
        }
        if (!response.ok) {
            setError(json);
            setSuccess(null);
        }
        }else if (user && user.Type === "Corporate"){
            const response = await fetch('/api/corpTrainee/page/reportProblem', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(body1)
            })
            const json = await response.json()
        if (response.ok) {
            setSuccess("Problem Reported Successfully");
            setError(null);
            setProblemTitle("");
            setProblemDescription("");
            setProblemType("");
            setOpen(false)
        }
        if (!response.ok) {
            setError(json);
            setSuccess(null);
        }
        }
        
            
    }
    return(
        <div>
    
           <Link
           sx={{color:"red", margin:"2px 20px"}}
           component="button"
           variant="body2"
           onClick={() => {
             setOpen(true);
           }}
         > <ReportIcon sx={{color:"red"}}></ReportIcon>Report Problem</Link>   
                
       <Dialog
        fullWidth
         open={open}
         aria-labelledby="responsive-dialog-title"
        >
    <Grid sx = {{ml:"20px"}}>
      <h2 >Report a problem</h2>
      </Grid>
                <Box>
                <DialogContent >
                    <Stack direction="column" spacing={2} >
                    <TextField label="Problem Title" variant="outlined" 
                        value={problemTitle}
                        onChange={(e) => setProblemTitle(e.target.value)}
                     />
                    <TextField label="Problem Description" variant="outlined" multiline rows={4}
                        value={problemDescription}
                        onChange={(e) => setProblemDescription(e.target.value)}
                    />
                    <FormControl >
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={problemType}
                        label="Type"
                        onChange={(e) => setProblemType(e.target.value)}
                    >
                        <MenuItem value={"Technical"}>Technical</MenuItem>
                        <MenuItem value={"Financial"}>Financial</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                    </FormControl>
                    <Stack direction='row' spacing={1}>
                    <Button sx={{background:"red"}} variant="contained"onClick={handleSubmit}>Report</Button>
                    <Button sx={{background:"green"}} variant="contained" onClick={() => setOpen(false)} >cancel</Button>
                    </Stack>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    </Stack>
                    </DialogContent>
                    
                </Box>
        </Dialog>
        </div>
    )
}
export default ReportProblem