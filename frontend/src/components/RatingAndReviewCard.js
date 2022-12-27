import { Box, Card, CardActionArea, CardContent, Rating, Typography, Avatar, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';


const RatingAndReviewCard = ({ Review }) => {
    // const [rating, setRating] = useState(Review.Rating);
    // const [review, setReview] = useState(Review.Review);
    // const [error, setError] = useState(null);

    return (
        <Card sx={{
            margin: '10px',
            padding: '5px',
            borderRadius: '16px',
        }}>
            <CardContent>
                <Stack direction="row" spacing={2}>
                <Avatar><PersonIcon /></Avatar>
                <Typography variant="h4">
                    {Review.Username==null ? Review.UserId : Review.Username}
                </Typography>
                </Stack>
                <Rating name="read-only" value={Review.Rating} readOnly/>
                <Box sx={{ minHeight:'70px', backgroundColor:"lightgray", padding:'8px', borderRadius:'8px' }}>
                <Typography variant="body1" >
                    {Review.Review}
                </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {Review.createdAt}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default RatingAndReviewCard