import React, { useEffect,useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuthContext } from "../hooks/useAuthContext";
import { renderMatches } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';

const RatingAndReview = ({courseID}) => {
    const {user} = useAuthContext();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [flag, setFlag] = useState(true);
    const [valueDisabled, setValueDisabled] = useState(0);

    useEffect(() => {
        const checkRating = async ()=> {
            const response = await fetch('/api/trainee/page/checkRatingTrainee', {
                method: 'GET',
                body: JSON.stringify({courseID}),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log('json is ' + json)
            if (response.status === 200){
                setFlag(false)
                const s = json
                console.log('s isss ' + s + "rating is " + s.Rating + "review is " + s.Review)
                setValueDisabled(s.Rating)
            }
            if(response.status === 404) {
                console.log(json.error)
                setFlag(true)

            }
        }
        checkRating()
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
            setError('You must be logged in');
            return;
        }
        const Username = user.Username;
        const body1 = {rating, review, courseID, Username};
        console.log(JSON.stringify(body1));
        const response = await fetch('/api/trainee/page/rateCourse', {
            method: 'POST',
            body: JSON.stringify(body1),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
            setSuccess(null);
            setFlag(true)
        }
        if(response.ok){
            setError(null);
            setReview('')
            setFlag(false)
            setValueDisabled(rating)
            setSuccess('Thank you for your feedback!');
        }
    }

    return(
        <Paper
            sx={{
                borderRadius: '20px',
                padding: '20px',
            }}
        >
        <Stack direction="column" spacing={2}>
            <Typography variant="h5" sx={{alignSelf:'center'}}>Rating: </Typography>
            {flag==true && <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  sx={{alignSelf:'center'}}
            />}
            {flag==false && valueDisabled!=0 && <Rating name="disabled" value={valueDisabled} disabled sx={{alignSelf:'center'}}/>}
            {flag==true && <TextField
                id="outlined-multiline-static"
                label="Review"
                multiline
                rows={4}
                defaultValue="Write your review here"
                onChange={(e) => setReview(e.target.value)}
                value={review}
                fullWidth
                borderRadius="16px"
            />}
            {flag==true && <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>}
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </Stack>
        </Paper>
        
    )

}
export default RatingAndReview;