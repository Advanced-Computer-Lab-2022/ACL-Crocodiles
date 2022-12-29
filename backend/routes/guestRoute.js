const express = require("express");

const {
  viewAllCourses,
  Search,
  filterCoursePrice,
  filterCourse,
  getMostPopularCourses,
  sortBy,
  CourseDetails,
  viewRatingAndReviews,
  getSubjectsAndPages
} = require("../controllers/guestController");

const router = express.Router();

router.get("/viewAllCourses", viewAllCourses);
router.post("/search", Search);
router.post("/filterbyprice", filterCoursePrice);
router.post("/filterbysr", filterCourse);
router.post("/sortBy", sortBy);
router.get("/getMostPopularCourses", getMostPopularCourses);
router.get('/viewratingandreviews/:courseid', viewRatingAndReviews)
router.get("/coursedetails/:id", CourseDetails);
router.get("/getSubjectsAndPages/", getSubjectsAndPages);


module.exports = router;
