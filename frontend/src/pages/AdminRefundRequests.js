import { Box, CircularProgress, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import AdminRefundRequest from '../components/AdminRefundRequestCard';


const AdminRefundRequests = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch('/api/admin/getpendingrefundrequests', {
                method: 'GET',
           });
        const json = await response.json();
        console.log('fetched requests: '+ json);
        if (response.ok) {
            setRequests(json);
            setError(null);
        }
        if (!response.ok) {
            alert(json.error)
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
                <AdminRefundRequest Request={request} />
            )) } 
            {!loading && requests.length === 0 && <Typography variant='h2'> No Pending Refund Requests </Typography>}
            
        </Box>
    );
}
export default AdminRefundRequests