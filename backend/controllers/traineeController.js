const Trainee = require('../models/traineeModel')

const mongoose = require('mongoose')
const Instructor = require('../models/instructorModel')
const { default: isBoolean } = require('validator/lib/isboolean')
const Course = require('../models/courseModel').course
const Subtitle = require('../models/courseModel').sub
const Exam = require('../models/examModel').exam
const Video = require('../models/courseModel').video


const createTrainee = async (req, res) => {
    const { Name, Email, Age } = req.body
    try {
        const trainee = await Trainee.create({ Name, Email, Age })
        res.status(200).json(trainee)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const getTrainees = async (req, res) => {
    const trainees = await Trainee.find({}).sort({ createdAt: -1 }).select({ Name: 1 })
    res.status(200).json(trainees)
}

const getTrainee = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such trainee' })
    }

    const trainee = await Trainee.findById(id)
    if (!trainee) {
        return res.status(404).json({ error: 'no such trainee2' })
    }
    res.status(200).json(trainee)
}
const isTrainee = async (req, res) => {
    const { id } = req.user
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(200).json({isTrainee:false})
    }

    const trainee = await Trainee.findById(id)
    if (!trainee) {
        return res.status(200).json({isTrainee:false})
    }
    return res.status(200).json({isTrainee:true})
}
const deleteTrainee = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such trainee3' })
    }
    const trainee = await Trainee.findByIdAndDelete(id)
    //or you can use Workout.findOneAndDelete({_id: id})

    if (!trainee) {
        return res.status(404).json({ error: 'no such trainee4' })
    }
    res.status(200).json(trainee)
}

const updateTrainee = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such trainee5' })
    }
    const trainee = await Trainee.findOneAndUpdate(id, req.body)
    if (!trainee) {
        return res.status(404).json({ error: 'no such trainee6' })
    }
    res.status(200).json(trainee)
}

const viewAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)

    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}

const filterCoursePrice = async (req, res) => {
    const { priceMin, priceMax } = req.body
    const courses = await Course.find({ Price: { $gte: priceMin } }, { Price: { $lte: priceMax } })
    if (!courses) {
        return res.status(404).json({ error: 'no courses found' })
    }
    res.status(200).json(courses)
}
const getSubtitles = async (req, res) => {
    const { IDs } = req.body
    const subtitles = []
    for (let i = 0; i < IDs.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(IDs[i])) {
            return res.status(404).json({ error: 'Invalid subtitle ID' })
        }
        const subtitle = await Subtitle.findById(IDs[i])
        if (subtitle)
            subtitles.push(subtitle)
        else
            res.status(500).json(error)
    }
    res.json(subtitles)
    console.log(subtitles)
}

const getMyCourses = async (req, res) => {
    const ID = req.user
    const courses = [];
    if (!mongoose.Types.ObjectId.isValid(ID)) {

        return res.status(404).json({ error: 'Invalid trainee ID' });
    }
    const trainee = await Trainee.findById(ID);
    if (!trainee)
        return res.status(400).json({ error: 'trainee not found' });


    const course_ids = trainee.My_courses;
    for (let i = 0; i < course_ids.length; i++) {
        const course_id = course_ids[i].course_id;
        if (!mongoose.Types.ObjectId.isValid(course_id))
            return res.status(404).json({ error: 'Invalid course id' });
        const course = await Course.findById(course_id)
        if (!course){
            console.log(course_id+'hi')
           return res.status(500).json({ error: "course not found" });
        }
        courses.push(course);

    }
    return res.json(courses);

}
const findCourse = async (req, res) => {
    const course_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(course_id))
        return res.status(404).json({ error: 'Invalid course id' });
    const course = await Course.findById(course_id)
        .populate({ path: 'Subtitle', populate: { path: 'Exercises' } })
        .populate({ path: 'Subtitle', populate: { path: 'Videos' } });
    if (!course)
        res.status(500).json(error);
    res.json(course);

}

const getMyTraineehelper = async (req, res) => {
    const user_id = "638b7b17bd450326695f11ea";

    if (!mongoose.Types.ObjectId.isValid(user_id))
        return res.status(404).json({ error: 'Invalid user id' });

    const trainee = await Trainee.findById(user_id)
        .populate({ path: 'My_courses', populate: { path: 'course_id' } })
        .populate({ path: 'My_courses', populate: { path: 'Assignments', populate: { path: "exercise_id" } } });

    if (!trainee)
        res.status(500).json({ error: "failed" });
    return (trainee);


}

const getMyTrainee = async (req, res) => {
    const trainee = await getMyTraineehelper(req, res);
    res.json(trainee);;


}


const getMyCourse = async (req, res) => {

    const trainee = await getMyTraineehelper(req, res);
    console.log(trainee)
    const course_id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(course_id))
        return res.status(404).json({ error: 'Invalid course id' });
    const course = await Course.findById(course_id)
    for (let i = 0; i < trainee.My_courses.length; i++) {
        console.log(trainee.My_courses[i].course_id)
        console.log(course._id)
        if (trainee.My_courses[i].course_id.equals(course._id)) {
            console.log(trainee)
            const t = await trainee.populate({ path: `My_courses.${i}.course_id`, populate: { path: 'Subtitle', populate: ['Exercises', 'Videos'] } })

            res.json(t.My_courses[i])
        }
    }
}


const findSub = async (req, res) => {
    const sub_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(sub_id))
        return res.status(404).json({ error: 'Invalid course id' });
    const sub = await Subtitle.findById(sub_id).populate('Exercises').populate('Videos');
    if (!sub)
        res.status(500).json({ error: 'Subtitle not found' });
    res.json(sub);

}
const findSub2 = async (req, res) => {
    //const sub_id = req.params.id;
    const sub_id = "638bb8348553b938065a1588"
    if (!mongoose.Types.ObjectId.isValid(sub_id))
        return res.status(404).json({ error: 'Invalid course id' });
    const sub = await Subtitle.findById(sub_id).populate('Exercises');
    if (!sub)
        res.status(500).json({ error: 'Subtitle not found' });
    res.json(sub);

}

const rateCourse = async (req, res) => {
    const courseID = req.params.id;
    const value = req.body.value;
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(404).json({ error: 'no such course id' })
    }
    try {
        let course1 = await Course.findById(courseID);
        const newRating = (course1.Rating * course1.RatingCount + value) / (course1.RatingCount + 1)
        course1 = await course1.update({ Rating: newRating, RatingCount: course1.RatingCount + 1 })
     return   res.status(200)
    }
    catch (error) {
        console.log(error)
       return res.status(400).json(error)
    }
}

const rateInstructor = async (req, res) => {
    const courseID = req.params.id;
    const { value1 } = req.body;
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(404).json({ error: 'no such course id' })
    }
    try {
        const course1 = await Course.findById(courseID);
        const instructorID = course1.InstructorId
        let instructor = await Instructor.findById(instructorID)
        if (!instructor)
          return  res.status(404).json({ error: 'no such instructor id' })
        const newRating = (instructor.Rating * instructor.RatingCount + value1) / (instructor.RatingCount + 1)
        instructor = await instructor.update({ Rating: newRating, RatingCount: (instructor.RatingCount + 1) })
       return res.status(200)
    }
    catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}


const viewExam = async (req, res) => {
    try {
        const examId = req.params.examid
        //const examId = "638bbc29a833c6dd287a66e4"
        const exams = await Exam.findById(examId).populate('Questions')
        if (!exams) {
            return res.status(404).json({ error: 'no exams found' })
        }

        res.status(200).json(exams)

    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}

const addAssignment = async (req, res) => {
    try {
        const traineeID = req.user
        const examId = req.body.Examid
        const answers = req.body.Answers
        const exam = await Exam.findById(examId)
        const cid = req.body.cid
        if (!exam) {
            return res.status(404).json({ error: 'not a valid exam id' })
        }

        const t = await Trainee.findById(traineeID);

        for (let i = 0; i < t.My_assignments.length; i++) {
            if (t.My_assignments[i].quiz_id.equals(examId))
                return res.status(400).json({ error: "test already taken" })
        }

       
        const trainee = await Trainee.updateOne({ _id: traineeID }, { $push: { My_assignments: { quiz_id: examId, Answer: answers } } })
       
        if (!trainee) {
            return res.status(404).json({ error: 'trainee not found' })
        }

  
        const x = await Trainee.findById(traineeID);
        console.log(x)
        updateProgressHelper(x,cid)

        res.json(trainee)

    } catch (error) {

        res.status(400).json({ error: 'error' })
    }
}


const getAssignment = async (req, res) => {
    try {

        const traineeID = req.user;
        const examId = req.body.Examid;

        const trainee = await Trainee.findById(traineeID)

        const Assignment = trainee.My_assignments.find(a => a.quiz_id.equals(examId))
        if (Assignment)
            return res.status(200).json(Assignment)

        return res.status(400).json({ error: "you did not take this exam" })


    } catch (error) {
        return res.status(400).json({ error: 'error' })
    }
}

const calculateGrade = async (req, res) => {
    try {

        const traineeID = req.user;
        const examId = req.body.Examid;
        const trainee = await Trainee.findById(traineeID)
        const exam = await Exam.findById(examId).populate('Questions')

        if (!exam) {
            return res.status(404).json({ error: 'not a valid exam id' })
        }




        if (!trainee) {
            return res.status(404).json({ error: 'trainee not found' })
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
            return res.status(400).json({ error: 'trainee did not take this test' })

        let grade = 0;

        for (let i = 0; i < Questions_solution.length; i++) {
            if (answer[i] == Questions_solution[i].correctAnswer)
                grade += 1;
        }

        const percentage = (grade / answer.length) * 100
       return res.json({ Grade: grade, Percentage: percentage })

    } catch (error) {

       return res.status(400).json({ error: 'error' })
    }
}

const addWatchedVideo = async (req,res)=>{ 
    try {
   console.log('hi')
    const traineeID = req.user
    const Videoid = req.body.Videoid
    const cid = req.body.cid
    const video = await Video.findById(Videoid)
    const t = await Trainee.findById(traineeID);
  
    if (!video) {
        return res.status(404).json({ error: 'not a valid video id' })
    }

    
    if (!t) {
        return res.status(404).json({ error: 'not a valid trainee id' })
    }

    for (let i = 0; i < t.Watched_videos.length; i++) {
        if (t.Watched_videos[i]==Videoid)
            return res.status(200).json(t)
    }

    const trainee = await Trainee.updateOne({ _id: traineeID }, { $push: { Watched_videos: Videoid } })

 


    if (!trainee) {
        return res.status(404).json({ error: 'trainee not found' })
    }
   
    const x = await Trainee.findById(traineeID);
    console.log(x)
    updateProgressHelper(x,cid)
 
   return res.json(trainee)

} 
catch (error) {

   return res.status(400).json({ error: 'error' })
}
}

const updateProgressHelper = async (trainee,CourseID)=>{ 
    const course = await Course.findById(CourseID).populate('Subtitle')
    const sub = course.Subtitle;
    let totalContent = 0;
    let seen = 0;
    for(let i=0;i<sub.length;i++){
        const vid = sub[i].Videos;
        console.log(vid)
        const ex = sub[i].Exercises;
        for(let j=0; j<vid.length;j++){
            console.log('here')
             const found = trainee.Watched_videos.find(watched => watched.equals(vid[j]));
             console.log(trainee.Watched_videos.length)
             if(found!=undefined)
             seen+=1;
            totalContent+=1; 
        }
        for(let j=0; j<ex.length;j++){
            console.log(trainee.My_assignments)
            const found = trainee.My_assignments.find(solved => solved.quiz_id.equals(ex[j]));
            if(found!=undefined)
            seen+=1;
            totalContent+=1;
        }
        
    }
    const newProgress =seen/(totalContent)
    const trainee1 = await Trainee.updateOne({ _id: trainee._id }, { $set: { "My_courses.$[i].Progress":newProgress  } },{arrayFilters:[{"i.course_id":CourseID}]})

  
}

const getProgress = async (req,res)=>{ 
const traineeID = req.user
const trainee = await Trainee.findById(traineeID)
if(!trainee)
    return res.status(404).json({error: 'trainee not found'})

const courseid = req.body.cid
const course = Course.findById(courseid)

if(!course)
    return res.status(404).json({error: 'trainee not found'})

    const found=trainee.My_courses.find(c => c.course_id.equals(courseid))
if(found)
    return res.status(200).json({Progress: found.Progress})

return res.status(200).json({error: 'you do not take this course'})
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
    getProgress
}