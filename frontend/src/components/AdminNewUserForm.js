import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useAuthContext } from "../hooks/useAuthContext";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';


const AdminNewUserForm = () => {
    const {user} = useAuthContext()
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')
    const [userType, setUserType] = useState('')
    const [error, setError] = useState(null)
    const PaperStyle = {padding:20 ,height:'65vh',width:280,margin:'20px auto'}

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userjs = { Username, Email, Password}
        console.log(JSON.stringify(userjs))
        if(userType === 'admin'){
            const response = await fetch('/api/admin/createadmin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(userjs)
            })
            const json = await response.json()
            console.log(json)
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setUsername('')
                setEmail('')
                setPassword('')
                setUserType('')
                setError(null)
                console.log('Created new admin', json)
            }
        }
        else if(userType === 'instructor'){
            const response = await fetch('/api/admin/createinstructor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(userjs)
            })
            const json = await response.json()
            console.log(json)
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setUsername('')
                setEmail('')
                setPassword('')
                setUserType('')
                setError(null)
                console.log('Created new instructor', json)
            }
        }
        else if(userType==='corporate trainee'){
            const response = await fetch('/api/admin/createcorporatetrainee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(userjs)
            })
            const json = await response.json()
            console.log(json)
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setUsername('')
                setEmail('')
                setPassword('')
                setUserType('')
                setError(null)
                console.log('Created new corporate trainee', json)
            }
        }
    }

    return (
        <Grid>
            <Paper elevation={10} style={PaperStyle} >
        <Typography variant="h5" component="div" gutterBottom >
            Create new user
        </Typography>
        <Stack direction="column" spacing={2} >
        <TextField
          required
          label="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
        />
        <TextField
            required
            label="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
        />
        <TextField
            required
            label="Password"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            label="User Type"
            required
            onChange={(e) => setUserType(e.target.value)}
        >
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'instructor'}>Instructor</MenuItem>
            <MenuItem value={'corporate trainee'}>Corporate Trainee</MenuItem>
        </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSubmit} >Create User</Button>
        </Stack>
        </Paper>
     </Grid>

    )
}

export default AdminNewUserForm