const Instructor = require("../models/instructorModel.js");
const Course = require("../models/courseModel.js").course;
const mongoose = require("mongoose");

const Search = async (req, res) => {
  const { Username, Title, Subject } = req.body;

  try {
    const instructor = await User.find({ Username }).select({ id: 1 });
    if (!instructor) {
      return res.status(404).json({ error: "Couldnt find instructor" });
    }
    const courses = await Course.find().or([
      { InstructorId: instructor },
      { Title: Title },
      { Subject: Subject },
    ]);
    if (!courses) {
      return res.status(404).json({ error: "no courses found" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};
const filterCourse = async (req, res) => {
  try {
    const { Rating, Price, Subject } = req.body.filter;
    const sort = req.body.sort;
    let course;

    let finalFilter = {};
    let finalSort = {};
    if (sort) {
      finalSort = sort;
    }
    if (
      Rating &&
      Rating != undefined &&
      !(Rating.$gte == 0 && Rating.$lte == 5)
    ) {
      finalFilter["Rating"] = Rating;
    }
    if (
      Price &&
      Price != undefined &&
      !(Price.$gte == 0 && Price.$lte == 500)
    ) {
      finalFilter["Price"] = Price;
    }
    if (Subject && Subject != undefined && !(Subject == "")) {
      finalFilter["Subject"] = Subject;
    }

    course = await Course.find(finalFilter).sort(finalSort);

    if (!course) {
      return res.status(404).json({ error: "no such course" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(400).json({ error: "error" });
  }
};

const filterCoursePrice = async (req, res) => {
  try {
    const { price } = req.body;

    const courses = await Course.find({ Price: { $gte: price[0] } }).find({
      Price: { $lte: price[1] },
    });
    if (!courses) {
      return res.status(404).json({ error: "no courses found" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

const getPrice = async (req, res) => {
  const cid = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(404).json({ error: "invalid input" });
  }

  const course = await Course.findById(cid);

  if (!course) return res.status(404).json("course not found");
  res.json(course.Price);
};
const viewAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      return res.status(404).json({ error: "no courses found" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

const sortBy = async (req, res) => {
  try {
    const sort = req.body.sort;
    const courses = await Course.find().sort(sort);
    if (!courses) {
      return res.status(404).json({ error: "no courses found" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

const getMostPopularCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ N_enrolled: -1 }).limit(4);
    if (!courses) {
      return res.status(404).json({ error: "no courses found" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

module.exports = {
  Search,
  getPrice,
  viewAllCourses,
  filterCoursePrice,
  filterCourse,
  getMostPopularCourses,
  sortBy,
};
