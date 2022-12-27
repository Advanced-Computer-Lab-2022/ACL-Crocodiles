import { Box, CircularProgress, Typography,Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import RefundRequest from '../components/RefundRequest';
import { useAuthContext } from '../hooks/useAuthContext';

const TraineeRefundRequests = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext()
    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch('/api/trainee/page/getrefundrequests', { headers:{
                    'Authorization': `Bearer ${user.token}`,
                }
           });

        const json = await response.json();
        console.log(json.error);
        if (response.ok) {
            setRequests(json);
            setError(null);
        }
        if (!response.ok) {
            setError(json);
            setLoading(false);
        }
        setLoading(false);
    };
  fetchRequests()
    }, [user]);

    return (<div>
        <h1>Requests</h1>
        <Box container sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
            
           <Stack direction='row' spacing={8} >
            {loading && <CircularProgress />}
            {requests.length!==0 && requests.map(request => (
                <RefundRequest Request={request} />
            ))} 
            {!loading && requests.length === 0 && <Typography variant='h4'> No Pending Refund Requests </Typography>}
            </Stack>
        </Box>
        </div>
    );
}
export default TraineeRefundRequests