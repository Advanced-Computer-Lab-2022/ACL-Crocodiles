import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import DropDown from "../components/CountryDropDown";
import NewCourseCardViewAll from "../components/NewCourseCardViewAll";
import { Box, CircularProgress, Grid, Skeleton, Stack } from "@mui/material";
import TraineeNavBar from "../components/TraineeNavBar";
import FilterDrawer from "../components/FilterDrawer";
import FilterDrawerSwipable from "../components/FilterDrawerSwipable";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import { minWidth } from "@mui/system";
import Pagination from  "@mui/material/Pagination";
import {createTheme,ThemeProvider} from '@mui/material';

//import NewCourseForm from '../components/NewCourseForm'
const CoursePagination = () => {

    const [courses, setCourses] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [resultCount, setResultCount] = useState(0);
    const currRatingRange = useSelector(
      (state) => state.ratingFilter.value.range
    );
    const currPriceRange = useSelector((state) => state.priceFilter.value.range);
    const currSubjectFilter = useSelector(
      (state) => state.subjectFilter.value.label
    );
    const currSort = useSelector((state) => state.sort.value);
    const search = useSelector((state) => state.search.value);
    let x = {};
    x[currSort.element] = currSort.ascending;
    
    const handlePage = (event, value) => {
      setPage(value);
    };
  const filterRS = async () => {
    const body = {
        filter: {
          Subject: currSubjectFilter,
          Rating: { $gte: currRatingRange[0], $lte: currRatingRange[1] },
          Price: { $gte: currPriceRange[0], $lte: currPriceRange[1] },
        },
        sort: x,
        search: search,
      };
    
    const response = await fetch(`/api/guest/filterbysr?page=${page-1}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      const t = [];
      setCourses(json.courses);
      setResultCount(json.count);
      
      // for (let i = 0; i < json.length; i++) {
      //   if (json[i].Subject != undefined && json[i].Subject) {
      //     const found = t.find((element) => element.label == json[i].Subject);
      //     if (found == undefined) {
      //       t.push({ label: json[i].Subject });
      //     }
      //   }
      // }
    

      if (json.length === 0) setError("No Courses found");
      else setError(null);
    }
  };
  const theme = createTheme({

    palette:{

        secondary:{
            main: '#A00407'
        }
    }
  })
  useEffect(() => {
    filterRS();
  
  },[currSubjectFilter,currRatingRange,currPriceRange,currSort,search,  page]);
  useEffect(() => {
    setPage(1)
  
  },[currSubjectFilter,currRatingRange,currPriceRange,currSort,search]);
 
  return (
    <ThemeProvider theme={theme}>
    <Box>
    <Box sx={{minHeight:'500px'}}>
    <div className="Course" style={{ display: "block" }}>
          <Grid container item spacing={1}>
            {courses &&
              courses.map((course) => (
                <Grid item xs={12} sm={6} md={4}>
                  <NewCourseCardViewAll
                    Course={course}
                    redirect={`/course/previewcourse?courseId=${course._id}`}
                  />
                </Grid>
              ))}
          </Grid>
           </div>
           </Box>
           <Pagination  theme={theme}class='pgntn'  count={Math.ceil(resultCount/15)} variant="outlined" color="secondary"  page={page} onChange={handlePage} />
           </Box>
           </ThemeProvider>
  );
};

export default CoursePagination;
