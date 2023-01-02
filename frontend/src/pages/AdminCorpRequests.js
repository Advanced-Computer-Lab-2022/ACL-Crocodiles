import { Box, CircularProgress, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import CourseRequest from '../components/CourseRequest';
const AdminCorpRequests = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch('/api/admin/getpendingcourserequests', {
                method: 'GET',
           });
        const json = await response.json();
        console.log('fetched requests: '+ json);
        if (response.ok) {
            setRequests(json);
            setError(null);
        }
        if (!response.ok) {
            setError(json);
        }
        setLoading(false);
    };
    fetchRequests();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {loading && <CircularProgress />}
            {requests.length!==0 && requests.map(request => (
                <CourseRequest Request={request} />
            )) } 
            {!loading && requests.length === 0 && <Typography variant='h2'> No Pending Course Requests </Typography>}
            
        </Box>
    );
}
export default AdminCorpRequests