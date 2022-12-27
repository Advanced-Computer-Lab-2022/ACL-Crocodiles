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
import Pagination from "@mui/material/Pagination";
import { minWidth } from "@mui/system";
import CoursePagination from './CoursePagination'
//import NewCourseForm from '../components/NewCourseForm'
const Course = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState(null);
  const [subjectOptions, setSubjectOptions] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const handlePage = (event, value) => {
    setPage(value);
  };
  const currRatingRange = useSelector(
    (state) => state.ratingFilter.value.range
  );
  const currPriceRange = useSelector((state) => state.priceFilter.value.range);
  const currSubjectFilter = useSelector(
    (state) => state.subjectFilter.value.label
  );
  const currSort = useSelector((state) => state.sort.value);
  const search = useSelector((state) => state.search.value);
  console.log(search);
  let x = {};
  x[currSort.element] = currSort.ascending;
    const [loading, setLoading] = useState(true)

    const getSubjects = async ()=>{ await fetch("/api/guest/getSubjectsAndPages", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      return res.json()})
      .then(data => {
        const arr = data.map((subject)=>({ label: subject }))
        setSubjectOptions(arr)}).catch((e)=>setError(e));
  }
   
  useEffect(() => {
    getSubjects()
  }, [

  ]);

  return (
    <div className="Course" style={{ display: "flex" }}>
      {subjectOptions && <FilterDrawer subjectOptions={subjectOptions} />}
      <FilterDrawerSwipable subjectOptions={subjectOptions} />

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {error && (
          <Alert sx={{ marginBottom: "20px" }} severity="error">
            {error}
          </Alert>
        )}

    <CoursePagination currSubjectFilter={currSubjectFilter} currRatingRange={currRatingRange} currPriceRange={currPriceRange} x={x} search={search} />
      
      </div>
    </div>
  );
};

export default Course;
