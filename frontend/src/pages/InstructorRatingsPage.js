import { Alert, Box, CircularProgress, Stack } from '@mui/material';
import {useEffect, useState} from 'react'
import RatingAndReviewCard from '../components/RatingAndReviewCard';
import { useAuthContext } from '../hooks/useAuthContext';

const InstructorRatingsPage = () => {
    const {user} = useAuthContext();
    const [ratings, setRatings] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRatings = async () => {
            const response = await fetch('/api/instructor/getmyratings', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
                })
            const json = await response.json();
            if (!response.ok) {
                console.log(json.error);
                setError(json.error);
            }
            if (response.ok) {
                console.log('ratings', json);
                setRatings(json);
                setError(null);
            }
            setLoading(false);
        }
            getRatings();
    },[user]);

    return (
        <Box sx={{margin:"16px", padding:"16px", width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Stack spacing={3} direction="column" sx={{margin:"16px", padding:"16px",width:'50%'}}>
            {ratings && ratings.map((rating) => (
                <RatingAndReviewCard Review={rating}/>
            ))}
            {loading && <CircularProgress sx={{color:'#A00407', alignSelf:'center'}}/>}
            {error && <Alert severity="error">{error}</Alert>}
        </Stack>
        </Box>
    );
}
export default InstructorRatingsPage;