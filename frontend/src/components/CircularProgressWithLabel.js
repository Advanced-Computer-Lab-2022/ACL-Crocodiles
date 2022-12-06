import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
   
      <CircularProgress variant="determinate" sx={{ position: "absolute", color: "lightgrey" }}size={100}{...props}  value={100} />
      <CircularProgress   sx={{ color: "white" }}  variant="determinate"   size={100} {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="rgb(208 255 210 / 60%)"
          fontSize={25}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
};

export default function CircularStatic({ per }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= per ? per : prevProgress + 1
      );
      if (progress >= per) clearInterval(timer);
    }, 20);
    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  return <CircularProgressWithLabel value={progress} />;
}
