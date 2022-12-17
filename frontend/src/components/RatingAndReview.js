import React, { useEffect,useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuthContext } from "../hooks/useAuthContext";
import { renderMatches } from 'react-router-dom';

const RatingAndReview = ({courseID}) => {
    const {user} = useAuthContext();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [flag, setFlag] = useState(null);
    const [valueDisabled, setValueDisabled] = useState(0);

    useEffect(() => {
        const checkRating = async ()=> {
            const data = {courseID}
            const response = await fetch('/api/trainee/page/checkRatingTrainee', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok){
                setFlag(false)
                const s = json[0]
                setValueDisabled(s.Rating)
            }
            else {
                setFlag(true)

            }
        }
        checkRating()
    })


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
            setReview('')
            setFlag(false)
            setValueDisabled(rating)
            setSuccess('Thank you for your feedback!');
        }
    }

    return(
        <Stack direction="column" spacing={2}>
            {flag==true && <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
            />}
            {flag==false && <Rating name="disabled" value={valueDisabled} disabled />}
            {flag==true && <TextField
                id="outlined-multiline-static"
                label="Review"
                multiline
                rows={4}
                defaultValue="Write your review here"
                onChange={(e) => setReview(e.target.value)}
                value={review}
                fullWidth
            />}
            {flag==true && <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>}
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </Stack>
        
    )

}
export default RatingAndReview;