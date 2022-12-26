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

module.exports = router;
