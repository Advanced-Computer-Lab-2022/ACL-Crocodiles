const Trainee = require('../models/traineeModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Instructor = require('../models/instructorModel')
const User = require('../models/userModel')
const Course = require('../models/courseModel').course
const Subtitle = require('../models/courseModel').sub
const Exam = require('../models/examModel').exam
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const courseRatingModel = require('../models/ratingAndReviewModel').courseRatingModel
const instructorRatingModel = require('../models/ratingAndReviewModel').instructorRatingModel
const { default: isBoolean } = require("validator/lib/isboolean");
const Video = require("../models/courseModel").video;
const Problem = require('../models/problemModel')
const RefundRequest = require("../models/refundRequestModel")
let course

const createTrainee = async (req, res) => {
    const { Name, Email, Age } = req.body;
    try {
        const trainee = await Trainee.create({ Name, Email, Age });
        res.status(200).json(trainee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTrainees = async (req, res) => {
    const trainees = await Trainee.find({})
        .sort({ createdAt: -1 })
        .select({ Name: 1 });
    res.status(200).json(trainees);
};

const getTrainee = async (req, res) => {
    const { id } = req.user;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such trainee" });
    }

    const trainee = await Trainee.findById(id);
    if (!trainee) {
        return res.status(404).json({ error: "no such trainee2" });
    }
    res.status(200).json(trainee);
};
const checkCourse = async (req, res) => {
    const trainee = req.user
    const { id } = req.params
    var flag = 0
    try {
        const mycourses = await Trainee.findOne({ _id: trainee })
        for (i = 0; i < mycourses.My_courses.length; i++) {
            if (mycourses.My_courses[i]._id.equals(id)) {
                flag = 1
            }
        }
        console.log(flag)
        if (flag === 1) {
            return res.status(200).json(flag)
        }
        else {
            return res.status(200).json(flag)
        }
    } catch (error) {
        return res.status(400).json({ error: error })
    }



}
const isTrainee = async (req, res) => {
    const { id } = req.user;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(200).json({ isTrainee: false });
    }

    const trainee = await Trainee.findById(id);
    if (!trainee) {
        return res.status(200).json({ isTrainee: false });
    }
    return res.status(200).json({ isTrainee: true });
};
const deleteTrainee = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such trainee3" });
    }
    const trainee = await Trainee.findByIdAndDelete(id);
    //or you can use Workout.findOneAndDelete({_id: id})

    if (!trainee) {
        return res.status(404).json({ error: "no such trainee4" });
    }
    res.status(200).json(trainee);
};

const updateTrainee = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such trainee5" });
    }
    const trainee = await Trainee.findOneAndUpdate(id, req.body);
    if (!trainee) {
        return res.status(404).json({ error: "no such trainee6" });
    }
    res.status(200).json(trainee);
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

const filterCoursePrice = async (req, res) => {
    const { priceMin, priceMax } = req.body;
    const courses = await Course.find(
        { Price: { $gte: priceMin } },
        { Price: { $lte: priceMax } }
    );
    if (!courses) {
        return res.status(404).json({ error: "no courses found" });
    }
    res.status(200).json(courses);
};
const getSubtitles = async (req, res) => {
    const { IDs } = req.body;
    const subtitles = [];
    for (let i = 0; i < IDs.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(IDs[i])) {
            return res.status(404).json({ error: "Invalid subtitle ID" });
        }
        const subtitle = await Subtitle.findById(IDs[i]);
        if (subtitle) subtitles.push(subtitle);
        else res.status(500).json(error);
    }
    res.json(subtitles);
};

const getMyCourses = async (req, res) => {
    const ID = req.user;
    const courses = [];
    console.log("hi");
    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(404).json({ error: "Invalid trainee ID" });
    }
    const trainee = await Trainee.findById(ID);
    if (!trainee) return res.status(400).json({ error: "trainee not found" });

    const course_ids = trainee.My_courses;

    for (let i = 0; i < course_ids.length; i++) {
        const course_id = course_ids[i]._id;

        if (!mongoose.Types.ObjectId.isValid(course_id))
            return res.status(404).json({ error: "Invalid course id" });
        const course = await Course.findById(course_id);
        if (!course) {
            return res.status(500).json({ error: "course not found" });
        }
        courses.push(course);
    }
    return res.json(courses);
};

const getMyCoursesLimited = async (req, res) => {
    const ID = req.user;
    let count = 0;
    const courses = [];
    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(404).json({ error: "Invalid trainee ID" });
    }
    const trainee = await Trainee.findById(ID);
    if (!trainee) return res.status(400).json({ error: "trainee not found" });

    const course_ids = trainee.My_courses;
    for (let i = 0; i < course_ids.length && count < 4; i++) {
        const course_id = course_ids[i]._id;
        if (!mongoose.Types.ObjectId.isValid(course_id))
            return res.status(404).json({ error: "Invalid course id" });
        const course = await Course.findById(course_id);
        if (!course) {
            return res.status(500).json({ error: "course not found" });
        }
        courses.push(course);
        count++;
    }
    return res.json(courses);
};
const findCourse = async (req, res) => {
    const course_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(course_id))
        return res.status(404).json({ error: "Invalid course id" });
    const course = await Course.findById(course_id)
        .populate({ path: "Subtitle", populate: { path: "Exercises" } })
        .populate({ path: "Subtitle", populate: { path: "Videos" } });
    if (!course) res.status(500).json(error);
    res.json(course);
};

const getMyTraineehelper = async (req, res) => {
    const user_id = "638b7b17bd450326695f11ea";

    if (!mongoose.Types.ObjectId.isValid(user_id))
        return res.status(404).json({ error: "Invalid user id" });

    const trainee = await Trainee.findById(user_id)
        .populate({ path: "My_courses", populate: { path: "course_id" } })
        .populate({
            path: "My_courses",
            populate: { path: "Assignments", populate: { path: "exercise_id" } },
        });

    if (!trainee) res.status(500).json({ error: "failed" });
    return trainee;
};

const getMyTrainee = async (req, res) => {
    const trainee = await getMyTraineehelper(req, res);
    res.json(trainee);
};

const getMyCourse = async (req, res) => {
    const trainee = await getMyTraineehelper(req, res);

    const course_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(course_id))
        return res.status(404).json({ error: "Invalid course id" });
    const course = await Course.findById(course_id);
    for (let i = 0; i < trainee.My_courses.length; i++) {
        if (trainee.My_courses[i].course_id.equals(course._id)) {
            const t = await trainee.populate({
                path: `My_courses.${i}.course_id`,
                populate: { path: "Subtitle", populate: ["Exercises", "Videos"] },
            });

            res.json(t.My_courses[i]);
        }
    }
};

const findSub = async (req, res) => {
    const sub_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(sub_id))
        return res.status(404).json({ error: "Invalid course id" });
    const sub = await Subtitle.findById(sub_id)
        .populate("Exercises")
        .populate("Videos");
    if (!sub) res.status(500).json({ error: "Subtitle not found" });
    res.json(sub);
};
const findSub2 = async (req, res) => {
    //const sub_id = req.params.id;
    const sub_id = "638bb8348553b938065a1588";
    if (!mongoose.Types.ObjectId.isValid(sub_id))
        return res.status(404).json({ error: "Invalid course id" });
    const sub = await Subtitle.findById(sub_id).populate("Exercises");
    if (!sub) res.status(500).json({ error: "Subtitle not found" });
    res.json(sub);
};

const viewExam = async (req, res) => {
    try {
        const examId = req.params.examid;
        //const examId = "638bbc29a833c6dd287a66e4"
        const exams = await Exam.findById(examId).populate("Questions");
        if (!exams) {
            return res.status(404).json({ error: "no exams found" });
        }

        res.status(200).json(exams);
    } catch (error) {
        res.status(400).json({ error: "error" });
    }
};

const addAssignment = async (req, res) => {
    try {
        const traineeID = req.user;
        const examId = req.body.Examid;
        const answers = req.body.Answers;
        const exam = await Exam.findById(examId);
        const cid = req.body.cid;
        if (!exam) {
            return res.status(404).json({ error: "not a valid exam id" });
        }

        const t = await Trainee.findById(traineeID);

        for (let i = 0; i < t.My_assignments.length; i++) {
            if (t.My_assignments[i].quiz_id.equals(examId))
                return res.status(400).json({ error: "test already taken" });
        }

        const trainee = await Trainee.updateOne(
            { _id: traineeID },
            {
                $push: {
                    My_assignments: { course_id: cid, quiz_id: examId, Answer: answers },
                },
            }
        );

        if (!trainee) {
            return res.status(404).json({ error: "trainee not found" });
        }

        const x = await Trainee.findById(traineeID);

        updateProgressHelper(x, cid);

        res.json(trainee);
    } catch (error) {
        res.status(400).json({ error: "error" });
    }
};

const getAssignment = async (req, res) => {
    try {
        const traineeID = req.user;
        const examId = req.body.Examid;

        const trainee = await Trainee.findById(traineeID);

        const Assignment = trainee.My_assignments.find((a) =>
            a.quiz_id.equals(examId)
        );
        if (Assignment) return res.status(200).json(Assignment);

        return res.status(400).json({ error: "you did not take this exam" });
    } catch (error) {
        return res.status(400).json({ error: "error" });
    }
};

const calculateGrade = async (req, res) => {
    try {
        const traineeID = req.user;
        const examId = req.body.Examid;
        const trainee = await Trainee.findById(traineeID);
        const exam = await Exam.findById(examId).populate("Questions");



        if (!exam) {
            return res.status(404).json({ error: "not a valid exam id" });
        }

        if (!trainee) {
            return res.status(404).json({ error: "trainee not found" });
        }

        const assignments = trainee.My_assignments;

        const Questions_solution = exam.Questions;
        let answer = null;

        for (let i = 0; i < assignments.length; i++) {
            if (assignments[i].quiz_id.equals(examId)) {
                answer = assignments[i].Answer;
            }
        }

        if (!answer)
            return res.status(400).json({ error: "trainee did not take this test" });

        let grade = 0;

        for (let i = 0; i < Questions_solution.length; i++) {
            if (answer[i] == Questions_solution[i].correctAnswer) grade += 1;
        }

        const percentage = (grade / answer.length) * 100;
        return res.json({ Grade: grade, Percentage: percentage });
    } catch (error) {
        return res.status(400).json({ error: "error" });
    }
};

const addWatchedVideo = async (req, res) => {
    try {
        const traineeID = req.user;
        const Videoid = req.body.Videoid;
        const cid = req.body.cid;
        const video = await Video.findById(Videoid);
        const t = await Trainee.findById(traineeID);

        if (!video) {
            console.log(video);
            return res.status(404).json({ error: "not a valid video id" });
        }

        if (!t) {
            return res.status(404).json({ error: "not a valid trainee id" });
        }

        for (let i = 0; i < t.Watched_videos.length; i++) {
            if (t.Watched_videos[i].video_id.equals(Videoid))
                return res.status(200).json(t);
        }

        const trainee = await Trainee.updateOne(
            { _id: traineeID },
            { $push: { Watched_videos: { video_id: Videoid, _id: cid } } }
        );

        if (!trainee) {
            return res.status(404).json({ error: "trainee not found" });
        }

        const x = await Trainee.findById(traineeID);

        updateProgressHelper(x, cid);

        return res.json(trainee);
    } catch (error) {
        return res.status(400).json({ error: "error" });
    }
};

const updateProgressHelper = async (trainee, CourseID) => {
    console.log("..............................");
    const course = await Course.findById(CourseID).populate("Subtitle");
    const sub = course.Subtitle;
    let totalContent = 0;
    let seen = 0;
    let seenVids = 0;
    let seenEx = 0;
    for (let i = 0; i < sub.length; i++) {
        const vid = sub[i].Videos;

        const ex = sub[i].Exercises;
        for (let j = 0; j < vid.length; j++) {
            const found = trainee.Watched_videos.find(
                (watched) =>
                    watched.video_id.equals(vid[j]) && watched._id.equals(CourseID)
            );

            if (found != undefined) {
                seenVids += 1;
                seen += 1;
            }

            totalContent += 1;
            console.log("seen videos:" + seen);
        }
        for (let j = 0; j < ex.length; j++) {
            const found = trainee.My_assignments.find(
                (solved) => solved.quiz_id.equals(ex[j]) && solved._id.equals(CourseID)
            );

            if (found != undefined) {
                seenEx += 1;
                seen += 1;
            }

            totalContent += 1;
            console.log("seen:" + seen);
        }
    }
    console.log("total:" + totalContent);
    const newProgress = seen / totalContent;
    const currSeen = [seenVids, seenEx];
    const t = totalContent;
    const trainee1 = await Trainee.updateOne(
        { _id: trainee._id },
        {
            $set: {
                "My_courses.$[i].Progress": {
                    value: newProgress,
                    seen: currSeen,
                    total: t,
                },
            },
        },
        { arrayFilters: [{ "i._id": CourseID }] }
    );
    return newProgress;
};

const getProgress = async (req, res) => {
    const traineeID = req.user;
    const trainee = await Trainee.findById(traineeID);
    if (!trainee) return res.status(404).json({ error: "trainee not found" });

    const courseid = req.body.cid;
    const course = Course.findById(courseid);

    if (!course) return res.status(404).json({ error: "trainee not found" });

    const found = trainee.My_courses.find((c) => c._id.equals(courseid));
    if (found) {
        const N_Vids = trainee.Watched_videos.length;
        const N_Ex = trainee.My_assignments.length;

        if (N_Vids != found.Progress.seen[0] || N_Ex != found.Progress.seen[1]) {
            console.log("OUTDATED");
            const newProgress = await updateProgressHelper(trainee, courseid);
            console.log(newProgress);
            return res.status(200).json({ Progress: newProgress });
        }
        console.log("ALL GOOD");
        return res.status(200).json({ Progress: found.Progress.value });
    }

    return res.status(200).json({ error: "you do not take this course" });
};

const addNote = async (req, res) => {
    try {
        const traineeID = req.user;
        const video_id = req.body.video_id;
        const course_id = req.body.course_id;
        const note = req.body.note;

        const trainee = await Trainee.find({
            _id: traineeID,
            My_courses: {
                $elemMatch: {
                    _id: course_id,
                    My_Notes: { $elemMatch: { video_id: video_id } },
                },
            },
        });
        if (trainee.length != 0) {
            const trainee1 = await Trainee.updateOne(
                { _id: traineeID },
                {
                    $push: {
                        "My_courses.$[i].My_Notes.$[j].Notes": note,
                    },
                },
                {
                    arrayFilters: [{ "i._id": course_id }, { "j.video_id": video_id }],
                }
            );

            if (trainee1) {
                return res.status(200).json(trainee1);
            }
        } else {
            const trainee1 = await Trainee.updateOne(
                { _id: traineeID },
                {
                    $push: {
                        "My_courses.$[i].My_Notes": { video_id: video_id, Notes: [note] },
                    },
                },
                {
                    arrayFilters: [{ "i._id": course_id }],
                }
            );
            if (trainee1) {
                return res.status(200).json(trainee1);
            }
        }
        return res.status(400).json({ error: "Could not update trainee" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const traineeID = req.user;
        const video_id = req.body.video_id;
        const course_id = req.body.course_id;

        const trainee = await Trainee.findOne({
            _id: traineeID,
            My_courses: {
                $elemMatch: {
                    _id: course_id,
                    My_Notes: { $elemMatch: { video_id: video_id } },
                },
            },
        });
        if (trainee) {
            const found = trainee.My_courses.find((course) =>
                course._id.equals(course_id)
            );
            if (found != undefined) {
                return res.status(200).json({
                    Notes: found.My_Notes.filter((note) =>
                        note.video_id.equals(video_id)
                    ).map((t) => t.Notes)[0],
                });
            } else {
                return res.status(400).json({ error: "not found" });
            }
        }
        return res.status(200).json({ Notes: [] });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const traineeID = req.user;
        const video_id = req.body.video_id;
        const course_id = req.body.course_id;
        const Note_index = req.body.Note_index;
        const trainee = await Trainee.findById(traineeID);
        if (!trainee) return res.status(404).json({ error: "trainee not found" });
        const found = trainee.My_courses.find((course) =>
            course._id.equals(course_id)
        );
        if (found == undefined) {
            return res.status(404).json({ error: "course not found" });
        }
        const foundNotes = found.My_Notes.find((v) => v.video_id.equals(video_id));
        if (foundNotes == undefined)
            return res.status(404).json({ error: "Notes not found" });

        const newArr = foundNotes.Notes;
        if (Note_index >= newArr.length) {
            return res.status(400).json({ error: "index out of bound" });
        }
        newArr.splice(Note_index, 1);

        const trainee1 = await Trainee.findByIdAndUpdate(
            traineeID,
            {
                $set: {
                    "My_courses.$[i].My_Notes.$[j].Notes": newArr,
                },
            },
            {
                arrayFilters: [{ "i._id": course_id }, { "j.video_id": video_id }],
            }
        );
        if (trainee1) {
            return res.status(200).json(trainee1);
        }
        return res.status(400).json({ error: "failed to delete note" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
};
const buyCourse = async (req, res) => {
    const { Title, _id, Discount } = req.body;
    let { Price } = req.body;

    course = _id;
    let price = (Price - Price * Discount * 0.01) * 100;

    try {
        const course = await Course.findOne({ _id: _id });
        if (!course) res.status(400).json({ error: "course has been removed" });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: Title,
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000",
        });
        res.json({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.messsage });
    }
};
const addCourse = async (req, res) => {
    try {
        console.log(course);
        const product = await Trainee.updateOne(
            { _id: req.user },
            {
                $push: {
                    My_courses: {
                        _id: course,
                        Progress: { value: 0, seen: [0, 0], total: 0 },
                    },
                },
            }
        );
        var coursecount = await Course.findOne({ _id: course });
        var count = coursecount.Count + 1;
        console.log(count);
        const updated = await Course.findByIdAndUpdate({
            _id: course,
            Count: count,
        });
        console.log(product, updated);
        res.status(200).json("course Added");
    } catch (error) {
        res.status(400).json({ error: error.messsage });
        console.log(error);
    }
};

const rateCourse = async (req, res) => {
    const { rating, review, courseID, Username } = req.body;
    const user = req.user;
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(404).json({ error: 'no such course id' })
    }
    try {
        const course1 = await Course.findById(courseID);
        if (!course1) {
            return res.status(404).json({ error: 'no such course id' })
        }
        const oldRating = course1.Rating
        const oldCount = course1.RatingCount
        const newCount = oldCount + 1
        const newRating = ((oldRating * oldCount) + rating) / (newCount)
        const course2 = await Course.findByIdAndUpdate(courseID, { $set: { Rating: newRating, RatingCount: newCount } })
        console.log('test mes username isss ' + Username)
        const ratrev = await courseRatingModel.create({ CourseId: courseID, UserId: user._id, Username: Username, Rating: rating, Review: review })
        res.status(200).json(ratrev)
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const checkRatingTrainee = async (req, res) => {
    const { courseID } = req.params;
    const traineeID = req.user;
    console.log('Courseid: ' + courseID)
    console.log('Userid: ' + traineeID._id)
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(404).json({ error: 'no such course id' })
    }
    try {
        const response = await courseRatingModel.findOne({ CourseId: courseID, UserId: traineeID })
        console.log('ratings is: ' + response)
        if (response) {
            return res.status(200).json({ rated: true, rating: response.Rating, review: response.Review })
        }
        return res.status(200).json({ rated: false })
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const rateInstructor = async(req,res)=>{
  const {rating, review, instructorID, Username} = req.body;
  const user = req.user;
  if(!mongoose.Types.ObjectId.isValid(instructorID)){ 
      return res.status(404).json({error: 'no such course id'})
  }
  try {
      const instructor1 = await Instructor.findById(instructorID);
      if(!instructor1){
          return res.status(404).json({error: 'no such course id'})
      }
      const oldRating = instructor1.Rating
      const oldCount = instructor1.RatingCount
      const newCount = oldCount + 1
      const newRating = ((oldRating*oldCount) + rating) / (newCount)
      const instructor2 = await Instructor.findByIdAndUpdate(instructorID , {$set: {Rating:newRating,RatingCount:newCount}})
      console.log('test mes username isss ' + Username)
      const ratrev = await instructorRatingModel.create({InstructorId:instructorID,UserId:user._id,Username: Username,Rating:rating,Review:review})
      res.status(200).json(ratrev)
  }
  catch(error){
      console.log(error)
      res.status(400).json(error)
  }
}

const getTraineeDetails = async (req, res) => {
    const id = req.user
    try {
        const user = await User.findById(id)
        const traineeDetails = await Trainee.findById(id)
        //const traineeDetails = await Trainee.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }

        res.status(200).json({ traineeDetails, user })

    } catch (error) {
        res.status(400).json({ error: 'error' })
        console.log(error)
    }
}

const reportProblem = async (req, res) => {
    const id = req.user
    const { Title, Description, courseId, type, Username } = req.body
    //const courseId = req.params.courseid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ error: 'no such course' })
        }
        const problem = await Problem.create({ submitter_id: id, submitter_username: Username, course_id: courseId, course_title: course.Title, Title: Title, Description: Description, Type: type })
        res.status(200).json(problem)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const checkRatingTraineeInstructor = async(req,res) => {
  const {instructorID} = req.params;
  const traineeID = req.user;
  console.log('instructorid: ' + instructorID)
  console.log('Userid: ' + traineeID._id)
  if(!mongoose.Types.ObjectId.isValid(instructorID)){ 
      return res.status(404).json({error: 'no such course id'})
  }
  try {
  const response = await instructorRatingModel.findOne({InstructorId:instructorID,UserId:traineeID})
  console.log('ratings is: ' + response)
  if(response){
      return res.status(200).json({rated: true, rating: response.Rating, review: response.Review})
  }
  return res.status(200).json({rated: false})
  }
  catch(error){
      console.log(error)
      res.status(400).json(error)
  }
}



const requestRefund = async (req, res) => {
    const { CourseID, CourseTitle, TraineeUsername } = req.body;
    const TraineeID = req.user
    if (!mongoose.Types.ObjectId.isValid(CourseID)) {
        return res.status(400).json({ error: 'Invalid course id' });
    }
    if (!mongoose.Types.ObjectId.isValid(TraineeID)) {
        return res.status(400).json({ error: 'Invalid trainee id' });
    }
    const course = await Course.findOne({ _id: CourseID })
    try {
        const newRefundRequest = await RefundRequest.create({ CourseID, TraineeID, CourseTitle, TraineeUsername, amount: course.Price * 0.5 })
        console.log(newRefundRequest)
        const trainee = await Trainee.updateOne({ TraineeID }, { $push: { My_Refund_Requests: newRefundRequest } })
        console.log(trainee)
        res.status(200).json(newRefundRequest)
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'error' })
    }
}
const getrefundrequests = async (req, res) => {
    const { id } = req.user
    try {
        const request = await RefundRequest.find({ TraineeID: id })
        if (!request)
            return res.status(401).json({ error: 'error' })
        res.status(200).json(request)
    } catch (error) {
        res.status(400).json({ error: error })
    }

}
const checkRequest = async (req, res) => {
    const { id } = req.user
    const { CourseID } = req.body
    try {
        const request = await RefundRequest.find({ TraineeID: id }).and({ CourseID })
        if (request.length === 0)
            return res.status(401).json({ error: 'error' })
        res.status(200).json({ message: "ok" })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const getMyProblems = async (req, res) => {
    const id = req.user
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        const problems = await Problem.find({ submitter_id: id })
        res.status(200).json(problems)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const addProblemComment = async (req, res) => {
    const { problemID, comment } = req.body
    const id = req.user
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such user id' })
    }
    if (!mongoose.Types.ObjectId.isValid(problemID)) {
        return res.status(404).json({ error: 'no such problem id' })
    }
    try {
        const problem = await Problem.findByIdAndUpdate(problemID,{ $push: { Comments: comment } })
        res.status(200).json(problem)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getTrainees,
    getTrainee,
    createTrainee,
    deleteTrainee,
    updateTrainee,
    viewAllCourses,
    getSubtitles,
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
    getProgress,
    addNote,
    getNotes,
    deleteNote,
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
};