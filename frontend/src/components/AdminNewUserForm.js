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

const AdminNewUserForm = () => {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [userType, setUserType] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = { Username, Password, userType }
        console.log(JSON.stringify(user))
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '400px',m:2}}>
        <Typography variant="h5" component="div" gutterBottom >
            Create new user
        </Typography>
            <div>
        <TextField
          required
          label="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ m: 1, width: '25ch' }}
        />
        <TextField
            required
            label="Password"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ m: 1, width: '25ch', alignContent: 'center'}}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            label="User Type"
            onChange={(e) => setUserType(e.target.value)}
        >
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'instructor'}>Instructor</MenuItem>
            <MenuItem value={'corporate trainee'}>Corporate Trainee</MenuItem>
        </Select>
        </FormControl>
        </div>
        <Button variant="contained" onClick={handleSubmit} sx={{maxWidth:'200px' }}>Create User</Button>
        </Box>

    )
}

export default AdminNewUserForm