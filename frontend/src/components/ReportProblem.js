import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";


const ReportProblem = ({courseid}) => {
    const {user} = useAuthContext();
    const [problemTitle, setProblemTitle] = useState("");
    const [problemDescription, setProblemDescription] = useState("");
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
        }
        if (!response.ok) {
            setError(json);
            setSuccess(null);
        }
        }
        
            
    }
    return(
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="body2" color="#ff0000" sx={{textDecoration: "underline"}}>
                    Report a problem
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
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
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Report</Button>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    </Stack>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
export default ReportProblem