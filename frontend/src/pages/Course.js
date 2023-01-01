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
import CoursePagination from './CoursePagination'
//import NewCourseForm from '../components/NewCourseForm'
const Course = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState(null);
  const [subjectOptions, setSubjectOptions] = useState(null);
  const [error, setError] = useState(null);
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

    <CoursePagination  />
      
      </div>
    </div>
  );
};

export default Course;
