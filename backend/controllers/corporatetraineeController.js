const Course = require('../models/courseModel').course
const mongoose = require('mongoose')
const CorpTrainee = require('../models/corporatetraineeModel')
const Exam = require('../models/examModel').exam
const CourseRequest = require('../models/courseRequestModel')
const Problem = require('../models/problemModel')
const courseRatingModel = require('../models/ratingAndReviewModel').courseRatingModel
const instructorRatingModel = require('../models/ratingAndReviewModel').instructorRatingModel
const Instructor = require('../models/instructorModel')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const Video = require("../models/courseModel").video;
const nodemailer = require('nodemailer')
const Validator = require('validator')

const viewAllCourses = async (req,res) => {
    try {
        const courses = await Course.find().select({Title:1,Hours:1,Rating:1,price:1})
        if(!courses){
            return res.status(404).json({error: 'no courses found'})
        }
            res.status(200).json(courses)
        
     } catch (error) {
       res.status(400).json({error: 'no courses found'})
     }
}
const searchCourse = async (req,res) => {
    try{
    const course = await Course.find(req.body)
    if(!course){
        return res.status(404).json({error: 'no such course'})
    }
    res.status(200).json(course)
    } catch(error){
    res.status(400).json({error: 'no courses found'})
    }
}
const getMyCourses = async(req, res)=>{

    const ID  = req.user;
    const courses = [];
    if(!mongoose.Types.ObjectId.isValid(ID)){
      
        return res.status(404).json({error: 'Invalid trainee ID'});
    }
    const corpTrainee = await CorpTrainee.findById(ID);
    if(!corpTrainee)
        return res.status(400).json({error: 'trainee not found'});

 
    const course_ids = corpTrainee.My_courses;

    for(let i=0;i<course_ids.length;i++){
        const course_id = course_ids[i];
        if(!mongoose.Types.ObjectId.isValid(course_id))
            return res.status(404).json({error: 'Invalid course id'});
        const course  = await Course.findById(course_id)
        if(course)
            courses.push(course);
         
       
     
    }
   return  res.json(courses);

}

const getCorp = async (req, res) => {
    const { id } = req.user;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such trainee" });
    }

    const trainee = await CorpTrainee.findById(id);
    if (!trainee) {
        return res.status(404).json({ error: "no such trainee2" });
    }
    res.status(200).json(trainee);
};

const findCourse = async(req,res)=>{
    const course_id = req.params.id;
 
    if(!mongoose.Types.ObjectId.isValid(course_id))
        return res.status(404).json({error: 'Invalid course id'});
     const course  = await Course.findById(course_id)
                                 .populate({path:'Subtitle', populate: {path:'Exercises' } })
                                 .populate({path:'Subtitle', populate: {path:'Videos' } });
     if(!course)
        res.status(500).json(error);
        console.log(course)
     res.json(course);
 
 }

 const viewExam = async (req, res) => {
    try {
        const examId = req.params.examid
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
        const corptraineeID = req.user
        const examId = req.body.Examid
        const answers = req.body.Answers
        const exam = await Exam.findById(examId)
        const cid = req.body.cid;
    
        if (!exam) {
            return res.status(404).json({ error: 'not a valid exam id' })
        }
     
        const t = await CorpTrainee.findById(corptraineeID);

        for(let i=0; i<t.My_assignments.length;i++){
            if(t.My_assignments[i].quiz_id.equals(examId))
                return res.status(400).json({error:"test already taken"}) 
        }

        const corpTrainee = await CorpTrainee.updateOne({_id: corptraineeID}, { $push: { My_assignments: {quiz_id:examId,Answer:answers}  }})
    
        if (!corpTrainee) {
            return res.status(404).json({ error: 'trainee not found' })
        }

   
        
        const x = await CorpTrainee.findById(corptraineeID);

        updateProgressHelper(x, cid);

          res.json(corpTrainee)

    } catch (error) {
       
        res.status(400).json({ error: error.message})
    }
}


const getAssignment = async (req,res)=>{
    try {
    
    const corptraineeID = "6391383e89acbda5734e887c";
    const examId = req.body.Examid;
  
    const corpTrainee = await CorpTrainee.findById(corptraineeID)

    const Assignment = corpTrainee.My_assignments.find(a => a.quiz_id.equals(examId))
    if(Assignment)
    return res.status(200).json(Assignment)
    
    return res.status(400).json({error: "you did not take this exam"})


} catch (error) {
    return res.status(400).json({ error: 'error' })
}
}


const calculateGrade = async (req, res) => {
    try {
       
        const traineeID = "6391383e89acbda5734e887c";
        const examId = req.body.Examid;   
        const trainee = await CorpTrainee.findById(traineeID)
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
     
         for(let i=0; i<assignments.length;i++){
        
            if(assignments[i].quiz_id.equals(examId)){
              
                answer = assignments[i].Answer;
             
            }
        
               
         }
      
         if(!answer)
            return  res.status(400).json({ error: 'trainee did not take this test' })
        
         let grade = 0;
    
         for(let i=0;i<Questions_solution.length;i++){
             if(answer[i]==Questions_solution[i].correctAnswer)
                 grade+=1;
         }
       
         const percentage = (grade/answer.length)*100
           res.json({Grade:grade, Percentage:percentage})

    } catch (error) {
       
        res.status(400).json({ error: 'error' })
    }
}

const requestCourse = async (req, res) => {
    const { CourseID, CourseTitle, TraineeUsername } = req.body;
    const TraineeID = req.user
    console.log(req.body)
    if (!mongoose.Types.ObjectId.isValid(CourseID)){
        return res.status(404).json({error: 'Invalid course id'});
    }
    if (!mongoose.Types.ObjectId.isValid(TraineeID)){
        return res.status(404).json({error: 'Invalid trainee id'});
    }
    try {
        const newCourseRequest = await CourseRequest.create({ CourseID, TraineeID, CourseTitle, TraineeUsername })
        console.log(newCourseRequest)
        const trainee = await CorpTrainee.findById(TraineeID)
        trainee.My_course_requests.push(newCourseRequest)
        await trainee.save()
        res.status(200).json(newCourseRequest)
        console.log('yayyyyyyyyyyyyyyyyyyy')
    } catch (error) {
        console.log('BOOOOOOOOOOOOOOOOOO!')
        console.log(error.message)
        res.status(400).json({ error: 'error' })
    }
}
const checkRequested = async (req, res) => {
    const {CourseID} = req.params;
    const TraineeID = req.user
    if (!mongoose.Types.ObjectId.isValid(CourseID)){
        return res.status(404).json({error: 'Invalid course id'});
    }
    if (!mongoose.Types.ObjectId.isValid(TraineeID)){
        return res.status(404).json({error: 'Invalid trainee id'});
    }
    try {
        const CourseReq = await CourseRequest.findOne({CourseID, TraineeID})
        console.log(CourseReq)
        if(CourseReq){
            return res.status(200).json({requested: true})
        }
        res.status(200).json({requested: false})
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}

const getMyCoursesLimited = async (req, res) => {
    const ID = req.user;
    let count = 0;
    const courses = [];
    if (!mongoose.Types.ObjectId.isValid(ID)) {
      return res.status(404).json({ error: "Invalid trainee ID" });
    }
    const trainee = await CorpTrainee.findById(ID);
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

const getCorporateTrainee = async (req, res) => {
    const {id} = req.user
    try {
        const trainee = await CorpTrainee.findById(id)
        if (!trainee) {
            return res.status(404).json({ error: 'no such corporate trainee' })
        }
        res.status(200).json(trainee)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

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

const checkRatingCorp = async (req, res) => {
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

const checkRatingCorpInstructor = async(req,res) => {
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

  const setFlag = async(req,res) => {
    const{Flag} = req.body
    console.log(req.body)
    const {id} = req.user
    try{
        const user = await User.findByIdAndUpdate(id,{Flag})
        console.log(user)
        if(!user){
            res.status(400).json({error: 'no user'})
        }
       // res.send(user.Flag) 

    }catch(error){
        console.log(error)
    }
}

const EditCorpinfo = async(req,res) => {
    const {Firstname,Lastname,Gender,Password,Flag} = req.body
    const {id} = req.user

    try{

    if(!Firstname){
        return res.status(400).json({ error: 'must enter Firstname' })
    }
    if(!Lastname){
        return res.status(400).json({ error: 'must enter Lastname' })
    }
    if(!Password){
        return res.status(400).json({ error: 'must change password' })
    }
    if(!Gender){
        return res.status(400).json({ error: 'must enter gender' })
    }
    const corp = await CorpTrainee.findByIdAndUpdate(id,{Firstname,Lastname,Gender})
    if(!corp){
        return res.status(404).json({ error: 'user not found 1' })
    }
    const salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(Password, salt)
    const user = await User.updateOne({_id:id},{Password:hash,Flag})
    if(!user){
        return res.status(404).json({ error: 'user not found 2' })
    }
    console.log(user)
    res.status(200).json('edited')
    }catch(error){
        res.status(401).json({error:error})
        console.log(error)

    }}

const getFlag = async (req,res) => {
    const {id} = req.user
    try {
        const flag = await User.findOne({_id:id})
        console.log(flag)   
        if(flag.Flag === 'true'){
            return res.status(200).json({flag:true})
        }
        else{
            return res.status(200).json({flag:false})
        }
  
    } catch (error) {
        console.log(error)
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

const addWatchedVideo = async (req, res) => {
    try {
        const traineeID = req.user;
        const Videoid = req.body.Videoid;
        const cid = req.body.cid;
        const video = await Video.findById(Videoid);
        const t = await CorpTrainee.findById(traineeID);

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

        const trainee = await CorpTrainee.updateOne(
            { _id: traineeID },
            { $push: { Watched_videos: { video_id: Videoid, _id: cid } } }
        );

        if (!trainee) {
            return res.status(404).json({ error: "trainee not found" });
        }

        const x = await CorpTrainee.findById(traineeID);

        updateProgressHelper(x, cid);

        return res.json(trainee);
    } catch (error) {
        return res.status(400).json({ error: "error" });
    }
};

const updateProgressHelper = async (corpTrainee, CourseID) => {
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
            const found = corpTrainee.Watched_videos.find(
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
            const found = corpTrainee.My_assignments.find(
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
    const trainee1 = await CorpTrainee.updateOne(
        { _id: corpTrainee._id },
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
    const trainee = await CorpTrainee.findById(traineeID);
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

        const trainee = await CorpTrainee.find({
            _id: traineeID,
            My_courses: {
                $elemMatch: {
                    _id: course_id,
                    My_Notes: { $elemMatch: { video_id: video_id } },
                },
            },
        });
        if (trainee.length != 0) {
            const trainee1 = await CorpTrainee.updateOne(
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
            const trainee1 = await CorpTrainee.updateOne(
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

        const trainee = await CorpTrainee.findOne({
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
        const trainee = await CorpTrainee.findById(traineeID);
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

        const trainee1 = await CorpTrainee.findByIdAndUpdate(
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

const certificateSendEmail = async (req, res) => {
    const { course_id } = req.body
    const x = req.user;
  
  
    const user = await User.findById(x._id)
    
    if (!user)
        return res.status(400).json({ error: 'No existing user' })
    const Email = user.Email;
    if (!Validator.isEmail(Email))
    return res.status(400).json({ error: 'Incorrect email format' })
  
    const trainee = await CorpTrainee.findById(x._id)
    if(!trainee){
      return res.status(400).json({ error: 'No existing user' })
    }
  const sentCourses = trainee.finishedandMailed
  
    const found = trainee.My_courses.find((course) =>
      course._id.equals(course_id)
    );
  
    if (found == undefined) {
      return  res.status(400).json({ error: 'Course not found' })
    }
    const progress = found.Progress.value;
  
  if(progress===1){
    const mailedAlready = sentCourses.find((course) =>
    course._id.equals(course_id))
    ;
    if(mailedAlready){
      return  res.status(200).json('mail already sent');
    }
  
    const t = await CorpTrainee.findByIdAndUpdate(user._id, {$push:{ finishedandMailed: { _id: course_id } }  })
  
  
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'aclguccrocs@outlook.com',
            pass: '@CLcr0cs'
        }
    });
  
    var mailOptions = {
        from: 'aclguccrocs@outlook.com',
        to: Email,
        subject: `Congratulations! Here is your certificate for ${found.Title}`,
        text: `Congratulations on receiving your ${found.Title} certificate! You canv now download your certificate. Your certificate is available in an online format so that you can retrieve it anywhere at any time, and easily share the details of your achievement.`,
    attachments: [{
      filename: 'certificate.pdf',
      path: '../certificate.pdf',
      contentType: 'application/pdf'
    }],
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(400).json(error.message);
        } else {
            return res.status(200).json(`Email sent: Email` + info.response);
        }
    });
  
  }else{
    console.log(progress)
    console.log()
   return  res.status(200).json('course not completed');
  }
  
  
  }

module.exports = {
    searchCourse,
    viewAllCourses,
    getMyCourses,
    findCourse,
    addAssignment,
    getAssignment,
    calculateGrade,
    viewExam,
    requestCourse,
    checkRequested,
    getMyCoursesLimited,
    reportProblem,
    getCorporateTrainee,
    rateCourse,
    checkRatingCorp,
    rateInstructor,
    checkRatingCorpInstructor,
    setFlag,
    getFlag,
    EditCorpinfo,
    getMyProblems,
    addProblemComment,
    addWatchedVideo,
    getProgress,
    addNote,
    getNotes,
    deleteNote,
    getCorp,
    certificateSendEmail,
}
