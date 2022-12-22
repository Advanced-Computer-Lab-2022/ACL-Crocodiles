import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSelector } from 'react-redux'
// import ButtonBase from '@material-ui/core/ButtonBase';
export default function BriefCourseCard({ Course, redirect }) {
    const country = useSelector((state) => state.country.value);
    return (
        <React.Fragment>
            <Card sx={{ maxWidth: 200 }} >

                <CardActionArea onClick={() => { window.location.href = redirect }}>
                    <CardHeader
                        title={Course.Title}
                        subheader={<Grid container><Grid item ><AccessTimeIcon fontSize="medium" /></Grid><Grid item >{Course.Hours + ' hrs'}</Grid></Grid>}
                    />
                    <CardContent>

                        {/* <Typography variant="body2" color="textSecondary" >
                            {Course.Summary}
                        </Typography > */}
                        {/* <Typography paragraph
                            align='left'>

                        </Typography> */}
                        {/* <Grid container
                            item spacing={2}>
                            <Grid item xs={3} md={6}> */}
                        <Typography style={{ fontWeight: 600 }} >
                            {Course.Price * country.rate + " " + country.code} </Typography>
                        {/* </Grid> */}
                        {/* <Grid item xs={3} md={6}> */}
                        <Typography align='left'>   <Rating value={Course.Rating} defaultValue={0} precision={0.5} readOnly /></Typography>
                        {/* </Grid> */}

                        {/* </Grid> */}

                    </CardContent>
                </CardActionArea>

            </Card>

        </React.Fragment>
    )
}
