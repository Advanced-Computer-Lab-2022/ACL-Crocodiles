import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import DropDown from "../components/CountryDropDown";
import NewCourseCardViewAll from "../components/NewCourseCardViewAll";
import { Grid } from "@mui/material";
import TraineeNavBar from "../components/TraineeNavBar";
import FilterDrawer from "../components/FilterDrawer";
import FilterDrawerSwipable from "../components/FilterDrawerSwipable";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import { minWidth } from "@mui/system";
//import NewCourseForm from '../components/NewCourseForm'
const Course = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState(null);
  const [subjectOptions, setSubjectOptions] = useState(null);
  const [error, setError] = useState(null);
  const currRatingRange = useSelector(
    (state) => state.ratingFilter.value.range
  );
  const currPriceRange = useSelector((state) => state.priceFilter.value.range);
  const currSubjectFilter = useSelector(
    (state) => state.subjectFilter.value.label
  );
  const currSort = useSelector((state) => state.sort.value);
  let x = {};
  x[currSort.element] = currSort.ascending;

  const body = {
    filter: {
      Subject: currSubjectFilter,
      Rating: { $gte: currRatingRange[0], $lte: currRatingRange[1] },
      Price: { $gte: currPriceRange[0], $lte: currPriceRange[1] },
    },
    sort: x,
  };
  //  { Subject:currSubjectFilter,Rating: currRatingRange}

  const filterRS = async () => {
    const response = await fetch("/api/guest/filterbysr", {
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
      setCourses(json);
      for (let i = 0; i < json.length; i++) {
        if (json[i].Subject != undefined && json[i].Subject) {
          const found = t.find((element) => element.label == json[i].Subject);
          if (found == undefined) {
            t.push({ label: json[i].Subject });
          }
        }
      }
      setSubjectOptions(t);

      if (json.length === 0) setError("No Courses found");
      else setError(null);
    }
  };

  useEffect(() => {
    filterRS();
  }, [user, currRatingRange, currSubjectFilter, currPriceRange, currSort]);

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
        <div className="Course" style={{ display: "flex" }}>
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
      </div>
    </div>
  );
};

export default Course;
