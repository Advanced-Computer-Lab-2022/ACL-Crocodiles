import { Paper, Typography, Stack, Button, Alert,Grid,Box,Divider } from '@mui/material'
import { useState } from 'react'


const RefundRequest = ({Request}) => {
    const [success, setSuccess] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState(null)
    console.log(Request)
    console.log(JSON.stringify({CourseID: Request.CourseID, TraineeID: Request.TraineeID}))

    




    return (
<Grid container   alignItems='flexstart' direction='row' >
        <Grid container direction="row"  alignItems="left" sx={{background:"white",border:'5px solid #A00407' ,borderRadius: '7px', padding:'5px', maxWidth:'400px', minHeight:'300px' } } >
           
            <Stack direction="column" spacing={1.5} alignItems='left'>
            <Grid>
            <Typography variant='h5' sx={{margin:'5px auto'}} color ='#A00407'>Request</Typography>
            <Divider></Divider>
            </Grid>
            <Grid container direction="row" justifyContent="left" alignItems="left" spacing={1}>
            
            <Typography variant='h6'>
                Course Requested:
            </Typography>
            <Typography  sx={{margin:'4px 5px'}} variant='body' color='red'>
                {Request.CourseTitle}
            </Typography>
            </Grid>
            <Grid container direction="row" justifyContent="left" alignItems="left" spacing={1}>
            <Typography variant='h6'>
                Amount:
            </Typography>
            <Typography sx={{margin:"4px 5px"}} variant='body' color='red'>
                {Request.amount}
            </Typography>
            </Grid>
            <Grid container direction="row" justifyContent="left" alignItems="left" spacing={1} >
            <Typography variant='h6'>
                Status:
            </Typography>
            {Request.Status==="Pending" &&<Typography sx={{margin:"4px 5px"}} variant='body1' color='#FFDA33'>
                {Request.Status}
            </Typography>}
            {Request.Status==="Granted" &&<Typography sx={{margin:"4px 5px"}} variant='body1' color='green'>
                {Request.Status}
            </Typography>}
            {Request.Status==="Denied" &&<Typography sx={{margin:"4px 5px"}} variant='body1' color='red'>
                {Request.Status}
            </Typography>}
            
            </Grid>
            <Grid container direction="row" justifyContent="left" alignItems="left" spacing={1} >
            <Typography variant='h6'>
                Submited on:
            </Typography>
            <Typography sx={{margin:"4px 5px"}} variant='body' color='#A00407'>
                {Request.createdAt}
            </Typography>
            
            </Grid>
            
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            </Stack>
        </Grid>
        </Grid>
    )
}
export default RefundRequest