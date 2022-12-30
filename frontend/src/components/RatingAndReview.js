import React, { useEffect,useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuthContext } from "../hooks/useAuthContext";
import { renderMatches } from 'react-router-dom';
import { Alert, Paper, Typography } from '@mui/material';

const RatingAndReview = ({courseID}) => {
    const {user} = useAuthContext();
    console.log("User iiiissss" + user)
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [flag, setFlag] = useState(null);
    const [valueDisabled, setValueDisabled] = useState(0);
    console.log('My courseID is : '+courseID);
    useEffect(() => {
        const checkRating = async ()=> {
            const response = (user.Type === 'Trainee') ? 
            
            await fetch('/api/trainee/page/checkRatingTrainee/'+courseID, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'content-type':'application/json',
                }
            }) : 
            await fetch('/api/corpTrainee/page/checkRatingTrainee/'+courseID, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'content-type':'application/json',
                }
            })
            const json = await response.json()
            console.log('json is ' + json)
            if (response.ok) {
                if (json.rated) {
                    setFlag(false);
                    setValueDisabled(json.rating);
                }
                else
                    setFlag(true);
            }
            if (!response.ok) {
                setError(error)
            }
        }
        if (user)
            checkRating()
    },[user])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
            setError('You must be logged in');
            return;
        }
        const Username = user.Username;
        const body1 = {rating: parseInt(rating), review, courseID, Username};
        console.log(JSON.stringify(body1));
        const response = (user.Type === 'Trainee') ?
        await fetch('/api/trainee/page/rateCourse', {
            method: 'POST',
            body: JSON.stringify(body1),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }) :
        await fetch('/api/corpTrainee/page/rateCourse', {
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
                borderRadius: '10px',
                padding: '20px',
                minWidth: '250px',
            }}
        >
        <Stack direction="column" spacing={2}>
            <Typography variant="h5" sx={{alignSelf:'center'}}>Rating (Course): </Typography>
            {flag && <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  sx={{alignSelf:'center'}}
            />}
            {!flag && valueDisabled!=0 && <Rating name="disabled" value={valueDisabled} readOnly sx={{alignSelf:'center'}}/>}
            {flag && <TextField
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
            {flag && <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>}
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
        </Stack>
        </Paper>
        
    )

}
export default RatingAndReview;