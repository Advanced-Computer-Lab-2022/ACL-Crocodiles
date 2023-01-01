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
        const corptraineeID = "6391383e89acbda5734e887c"
        const examId = req.body.Examid
        const answers = req.body.Answers
        const exam = await Exam.findById(examId)
    
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

   
        
          res.json(corpTrainee)

    } catch (error) {
       
        res.status(400).json({ error: 'error' })
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
    } catch (error) {
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
}
