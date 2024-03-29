import { useState,useEffect } from "react"
import Paper from '@mui/material/Paper';
import { Button, Rating, Stack, Typography, Box } from "@mui/material";
import bgImage from "../../images/hope.jpg"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
const InstCourseDetails = ({Course}) => {
    const [courseDiscount, setCourseDiscount] = useState(Course.Discount);
    const [newPrice, setNewPrice] = useState(Course.Price-(Course.Price*courseDiscount/100));
    const navigate = useNavigate();
    const country = useSelector((state) => state.country.value);
    useEffect(() => {
        setCourseDiscount(Course.Discount);
        setNewPrice(Course.Price-(Course.Price*courseDiscount/100));
    }, [Course.Discount])
    return (
        <Box sx={{
            backgroundImage: `url(${bgImage}) `,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "grid",
            width: "100%",
            padding: "20px",
            alignItems: "center",
          }}>
            <Stack direction="column" spacing={1} alignItems="center">
            <Typography variant="h1">
                {Course.Title}
            </Typography>
            <Typography variant="h2">
                {Course.Subject}
            </Typography>
            <Button
                variant="text"
                onClick={() => {navigate('/viewratings/'+Course._id)}}
                >
                    <Stack direction="column" spacing={0.2} alignItems="center">
                        <Rating name="read-only" value={Course.Rating} readOnly precision={0.1}/>
                        <Typography variant="body1" color="#FAAF00">View All Ratings and Reviews</Typography>
                    </Stack>
            </Button>

            <Typography>
                {Course.Summary}
            </Typography>
            {Course.Discount > 0? <p><s>{Course.Price * country.rate + " " + country.code}</s> {newPrice}</p>: <p>{Course.Price * country.rate + " " + country.code}</p> }
            </Stack>
        </Box>
    )
}
export default InstCourseDetails