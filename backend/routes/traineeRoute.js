const express = require("express");
const requireAuthTrainee = require("../middleware/requireAuthTrainee");
const {
    createTrainee,
    getTrainee,
    getTrainees,
    deleteTrainee,
    updateTrainee,
    viewAllCourses,
    getSubtitles,
    viewExams,
    viewExam,
    getMyCourses,
    findCourse,
    findSub,
    getMyTrainee,
    getMyCourse,
    findSub2,
    rateCourse,
    rateInstructor,
    addAssignment,
    getAssignment,
    calculateGrade,
    isTrainee,
    addWatchedVideo,
    addNote,
    getNotes,
    deleteNote,
    getProgress,
    buyCourse,
    addCourse,
    getMyCoursesLimited,
    checkCourse,
    checkRatingTrainee,
    getTraineeDetails,
    reportProblem,
    checkRatingTraineeInstructor,
    requestRefund,
    getrefundrequests,
    checkRequest,
    getMyProblems,
    addProblemComment,

  certificateSendEmail
} = require("../controllers/traineeController");

const router = express.Router();

router.use(requireAuthTrainee)
router.post('/page/buynow', buyCourse)

router.get("/", getTrainees);

router.get("/page", getTrainee);

router.post("/", createTrainee);

router.delete("/:id", deleteTrainee);

router.patch("/:id", updateTrainee);

router.get('/page/viewAllCourses', viewAllCourses)


//router.get('/page/viewExams/:courseid', viewExams)

router.get("/page/viewExam/:examid", viewExam);
router.get("/page/checkcourse/:id", checkCourse)
router.get("/page/course/MyCourses", getMyCourses);
router.get("/page/getMyCoursesLimited", getMyCoursesLimited);
router.get("/page/MyCourses/:id", findCourse);
router.get("/page/findSub/:id", findSub);
router.get("/page/getMyTrainee/", getMyTrainee);
router.get("/page/isTrainee/", isTrainee);
router.get("/page/getMyCourse/:id", getMyCourse);
router.post("/subtitles", getSubtitles);
router.patch("/page/addAssignment", addAssignment);
router.post("/page/getAssignment", getAssignment);
router.post("/page/calculateGrade", calculateGrade);
router.patch("/page/addWatchedVideo", addWatchedVideo);
router.patch("/page/addNote", addNote);
router.patch("/page/deleteNote", deleteNote);
router.post("/page/getNotes", getNotes);
router.get("/page/sub/", findSub2);
router.post('/page/rateCourse', rateCourse)
router.post('/page/rateInstructor', rateInstructor)
router.get('/page/checkRatingTrainee/:courseID', checkRatingTrainee)
router.post("/page/getProgress/", getProgress);
router.post("/addcourse", addCourse);
router.post('/page/reportProblem', reportProblem)
router.get('/page/traineedetails', getTraineeDetails)
router.post("/page/requestrefund", requestRefund)
router.get("/page/getrefundrequests", getrefundrequests)
router.post("/page/checkrequest", checkRequest)
router.get('/page/checkRatingTraineeInstructor/:instructorID', checkRatingTraineeInstructor)
router.get('/page/getMyProblems', getMyProblems)
router.post('/page/addProblemComment', addProblemComment)
router.put('/page/certificateSendEmail',certificateSendEmail)

module.exports = router






