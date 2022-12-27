import { Alert, Box, Button, CircularProgress, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react'
import AdminPromoCourse from './AdminPromoCourse';
const AdminPromoSome = () => {
    const todayDate = Date.now();
    const [Discount, setDiscount] = useState('');
    const [EndDate, setEndDate] = useState(todayDate);
    const [selectedCourses, setSelectedCourses] = useState([])
    const [courses, setCourses] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/guest/viewAllCourses')
            const json = await response.json()
            if (response.ok) {
                setCourses(json)
                setLoading(false)

            }
            if (!response.ok) {
                setError(error)
                setLoading(false)
            }
        }
        fetchCourses()
    },[courses])

    const onSelect = (courseid,dir) => {
        console.log('selected courses before: '+ selectedCourses)
        if(dir){
            setSelectedCourses([...selectedCourses, courseid])
        }
        else{
            setSelectedCourses(selectedCourses.filter(id => id !== courseid))
        }
        console.log('selected courses after: '+ selectedCourses)
    }

    const promoClick = async () => {
        console.log('selected courses: '+ selectedCourses)
        setSuccess(false)
        if(selectedCourses.length === 0){
            setError('Please select at least one course')
            return
        }
        if(Discount === ''){
            setError('Please enter a discount')
            return
        }
        if(EndDate === ''){
            setError('Please enter an end date')
            return
        }
        if(Discount < 0 || Discount > 100){
            setError('Discount must be between 0 and 100')
            return
        }
        setError(null)
        setSubmitLoading(true)
        for(let i=0;i<selectedCourses.length;i++){
            console.log(selectedCourses[i])
            const promo = {courseid: selectedCourses[i],
                discount: parseInt(Discount),
                enddate: EndDate+ 'T00:00:00.000Z'}
            const response = await fetch('/api/admin/setpromotion', {
                method: 'PUT',
                body: JSON.stringify(promo),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const json = await response.json()
            if (response.ok) {
                console.log('success')
                setSubmitLoading(false)
            }
            if (!response.ok) {
                setError(json.error)
                setSubmitLoading(false)
                return
            }
        }
        setSuccess(true)
    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', m:2, p:2 }}>
            <Typography variant='h3'> Define Promotion on Specific Courses </Typography>
            <Paper elevation={3} sx={{ p:2, m:2, width: '100%' }}>
            <Stack direction='column' spacing={2} margin='2px' padding='2px'>
                <TextField type="number" label='Discount' variant='outlined' value={Discount} onChange={(e) => setDiscount(e.target.value)}/>
                <TextField type="date" label='End Date' variant='outlined' value={EndDate} onChange={(e) => setEndDate(e.target.value)}/>
            <Button variant='contained' onClick={promoClick}> Set Promotion </Button>
            {submitLoading && <CircularProgress/>}
            {error && <Alert severity='error'>{error}</Alert>}
            {success && <Alert severity='success'>Promotion Successfully Set</Alert>}
            </Stack>
            </Paper>
            <Typography variant='body1'> Please Select Courses from the following </Typography>
            {loading && <CircularProgress/>}
        <Grid container spacing={2}>
            {courses && courses.map(course => (
            <Grid item xs={12} sm={3} md={3}>
                <AdminPromoCourse course={course} onSelect={onSelect}/>
            </Grid> ))}
        </Grid>
        </Box>
    )
}
export default AdminPromoSome