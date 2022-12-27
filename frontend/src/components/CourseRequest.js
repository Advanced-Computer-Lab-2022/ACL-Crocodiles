import { Paper, Typography, Stack, Button, Alert } from '@mui/material'
import { useState } from 'react'


const CourseRequest = ({Request}) => {
    const [success, setSuccess] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState(null)
    console.log(Request)
    console.log(JSON.stringify({CourseID: Request.CourseID, TraineeID: Request.TraineeID}))
    const onGrant = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/admin/grantcourseaccess',
        { body: JSON.stringify({CourseID: Request.CourseID, TraineeID: Request.TraineeID}), method: 'POST',
        headers: {
            'Content-type': 'application/json',
        }})
        const json = await response.json()
        if(response.ok){
            setSuccess('Course Access Granted successfully')
            setDisabled(true)
        }
        if(!response.ok){
            setError(json)
        }

    }
    const onDeny = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/admin/denycourseaccess',
        { body: JSON.stringify({CourseID: Request.CourseID, TraineeID: Request.TraineeID}), method: 'POST',
        headers: {
            'Content-type': 'application/json',
        }})
        const json = await response.json()
        if(response.ok){
            setSuccess('Course Access Denied successfully')
            setDisabled(true)
        }
        if(!response.ok){
            setError(json)
        }
    }
    return (
        <Paper elevation={1} sx={{borderRadius:'8px', margin:'16px', padding:'16px', minWidth:'600px', minHeight:'200px' }}>
            <Stack direction="column" spacing={2} alignItems='center'>
            <Stack direction='column' spacing={0.5} alignItems='center'>
            <Typography variant='body1'>
                Course Requested:
            </Typography>
            <Typography variant='h3'>
                {Request.CourseTitle}
            </Typography>
            </Stack>
            <Stack direction='column' spacing={0.5} alignItems='center'>
            <Typography variant='body1'>
                Trainee:
            </Typography>
            <Typography variant='h4'>
                {Request.TraineeUsername}
            </Typography>
            </Stack>
            <Stack direction="row" spacing={4}>
                <Button onClick={onGrant} variant="contained" disabled={disabled} sx={{backgroundColor:'#058924', borderRadius:'4px', width:'120px', height:'50px'}}>Grant Access</Button>
                <Button onClick={onDeny} variant="contained" disabled={disabled} sx={{backgroundColor:'#aa0505', borderRadius:'4px', width:'120px', height:'50px'}}>Deny Access</Button>
            </Stack>
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            </Stack>
        </Paper>
    )
}
export default CourseRequest