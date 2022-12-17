import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuthContext } from "../hooks/useAuthContext";

const RatingAndReview = ({courseID}) => {
    const {user} = useAuthContext();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
            setError('You must be logged in');
            return;
        }
        const body1 = {rating, review, courseID};
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
        }
        if(response.ok){
            setError(null);
            setSuccess('Thank you for your feedback!');
        }

    }

    return(
        <Stack direction="column" spacing={2}>
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
            />
            <TextField
                id="outlined-multiline-static"
                label="Review"
                multiline
                rows={4}
                defaultValue="Write your review here"
                onChange={(e) => setReview(e.target.value)}
                value={review}
                fullWidth
            />
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </Stack>
    )

}
export default RatingAndReview;