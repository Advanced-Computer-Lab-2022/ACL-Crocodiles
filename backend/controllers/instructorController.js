const Instructor = require('../models/instructorModel')
const Question = require('../models/examModel').question
const Subtitle = require('../models/courseModel').sub
const Exam = require('../models/examModel').exam
const Sub = require('../models/courseModel').sub
const Video = require('../models/courseModel').video
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Validator = require('validator')
const Course = require('../models/courseModel').course
const Problem = require('../models/problemModel')
const instructorRatingModel = require('../models/ratingAndReviewModel').instructorRatingModel



var Questions = [{}]

const createCourse = async (req, res) => {
    const InstructorId = req.user.id
    console.log(InstructorId)
    const { Title, Subject, Price, Summary} = req.body
    if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
      return res.status(404).json({ error: "no such id" });
    }
    const instr = await Instructor.findById(InstructorId)
    const InstructorName = instr.Firstname + " " + instr.Lastname
    try {
        const course = await Course.create({ Title, Subject, Price, InstructorId, InstructorName, Summary })
        const instructor = await Instructor.updateOne({_id:InstructorId},{$push: { My_Courses: course._id } })
        res.status(200).json({course, instructor})
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  const createSubtitle = async (req, res) => {
    const InstructorId  = req.user
    const {subtitle,subHours} = req.body
    const courseId = req.params.courseid
    console.log(req.body)
    if(!mongoose.Types.ObjectId.isValid(InstructorId)){
        return res.status(404).json({error: 'no such id'})
    }
    try {
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({error: 'no such course'})
        }
        const newHours = course.Hours + subHours
        const sub = await Sub.create({Title: subtitle, Hours: subHours})
        course.Hours = newHours
        course.Subtitle.push(sub)
        await course.save()
        res.status(200).json(sub)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const CheckFlag = async (req,res) => {
    id = req.user
    try{
        const flag = await User.findById(id).select('Flag')
        res.status(200).send(flag)
    }
    catch(error){

    }
}

const createVideo = async (req, res) => {
    const InstructorId = req.user
    const { videoTitle, videoDesc, videoURL, subId } = req.body
    if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        const sub = await Subtitle.findById(subId)
        if (!sub) {
            return res.status(404).json({ error: 'no such subtitle' })
        }
        const video = await Video.create({ videoTitle, videoDesc, videoURL })
        sub.Videos.push(video)
        await sub.save()
        res.status(200).json(sub)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const searchCourse = async (req, res) => {
    const InstructorId = req.user
    const { Title, Subject } = req.body
    if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        const course = await Course.find().or([{ Title: Title }, { Subject: Subject }]).and([{ InstructorId: InstructorId }])
        if (!course) {
            return res.status(404).json({ error: 'no such course' })
        }
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const editEmail = async (req, res) => {
    try{
    const { Email} = req.body
    const id = req.user

    if (Email && !Validator.isEmail(Email)){
        return res.status(400).json({ error: 'incorrect Email format' })
    }
    let user = await User.findOne({Email})
    if( user ) {
        return res.status(400).json({ error: 'Email already in use' })
    }
   
    const userupdated = await User.findByIdAndUpdate(id, { Email: Email })
    return res.status(200).json(userupdated )
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
}
const editBiography = async(req,res) => {
    try{
        const {Biography} = req.body
        const id = req.user
        const updated = await Instructor.findByIdAndUpdate(id, { Biography: Biography })
        if(!updated)
            return res.status(400).json({ error: 'No user found' })

        return res.status(200).json(updated)
        
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
}


const viewAllInsCourses = async (req, res) => {

    try {

        const InstructorId = req.user
        if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
            return res.status(404).json({ error: 'no such id' })
        }

        const courses = await Course.find({ InstructorId: InstructorId })
        if (!courses) {
            return res.status(404).json({ error: 'no courses found' })
        }
        res.status(200).json(courses)

    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}

const defineDiscount = async (req, res) => {
    const NewDiscount = req.body.discountint
    const EndDate = req.body.enddate
    const CourseID = req.params.courseid
    console.log('CourseID' + CourseID)
    console.log('reqpa ' + JSON.stringify(req.params))
    console.log('reqbody ' + JSON.stringify(req.body))
    console.log('NewDiscount ' + NewDiscount)
    console.log('EndDate ' + EndDate)
    if (!mongoose.Types.ObjectId.isValid(CourseID)) {
        return res.status(404).json({ error: 'no such course id' })
    }
    try {
        //find the course and update it with the new values instead of the null values
        const course = await Course.findByIdAndUpdate(CourseID, { $set: { Discount: NewDiscount, DiscountEndDate: EndDate } }, { new: true })
        console.log('course title: ' + course.Title)
        if (!course) {
            return res.status(404).json({ error: 'no such course' })
        }
        res.status(200).json(course)
    }
    catch (error) {
        res.status(400).json({ error: 'error' })
    }
}

const createQuestion = async (req, res) => {

    const { QuestionHeader, Answer1, Answer2, Answer3, Answer4, correctAnswer } = req.body
    const examID = await Exam.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).select('_id')


    try {
        const examQuestion = await Question.create({ QuestionHeader, Answer1, Answer2, Answer3, Answer4, correctAnswer })
        const qid = await Question.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).select('_id')
        const examm = await Exam.updateOne({ _id: examID }, { $push: { Questions: qid } })
        res.status(200).json(Questions)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createExam = async (req, res) => {

    const InstructorId = req.user
    //const courseId = req.params.courseid
    const subtitleId = "638fbef1b01d216ab283c812"




    if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        Questions = []
        const exam = await Exam.create({ subtitleId, Questions, InstructorId })
        const eid = await Exam.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).select('_id')
        console.log(eid)
        const examm = await Subtitle.updateOne({ _id: subtitleId }, { $push: { Exercises: eid } })
        res.status(200).json(exam)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const viewExams = async (req, res) => {

    const f = await Exam.find().populate('Questions')
    res.status(200).json(f)


    if (!mongoose.Types.ObjectId.isValid(InstructorId)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        Questions = []
        const exam = await Exam.create({ subtitleId, Questions, InstructorId })
        const eid = await Exam.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1).select('_id')
        console.log(eid)
        const examm = await Subtitle.updateOne({ _id: subtitleId }, { $push: { Exercises: eid } })
        res.status(200).json(exam)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}





const getRating = async (req, res) => {
    const id = req.user
    try {
        const rating = await Instructor.findById(id).select({ Rating: 1, RatingCount: 1 })
        console.log(rating)
        if (!rating) {
            return res.status(404).json({ error: 'rating is null' })
        }
        res.status(200).json(rating)
    } catch (error) {
        res.status(400).json({ error: 'error getting rating and rating count' })
    }
}
const setFlag = async(req,res) => {
    const{Flag} = req.body
    console.log(req.body)
    const {id} = req.user
    try{
        const user = await User.findByIdAndUpdate(id,{Flag:Flag})
        console.log(user)
        if(!user){
            res.status(400).json({error: 'no user'})
        }
       // res.send(user.Flag) 

    }catch(error){
        console.log(error)
    }
}

const getInsDetails = async (req, res) => {
    const id = req.user
    try {
        const user = await User.findById(id)
        const instructorDetails = await Instructor.findById(id)
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }
       
        res.status(200).json({instructorDetails,user})

    } catch (error) {
        res.status(400).json({ error: 'error' })
        console.log(error)
    }
}
const EditInstructorinfo = async(req,res) => {
    const {Firstname,Lastname,Gender} = req.body
    try{
    const instructor = await Instructor.findByIdAndUpdate(req.user,{Firstname,Lastname,Gender})
    if(!instructor){
        return res.status(404).json({ error: 'user not found' })
    }
    res.status(200).json('edited')
    }catch(error){
        res.status(400).json({error:error})

    }
}
const getCourse = async (req, res) => {
    const courseid = req.params.courseid
    console.log('helloo '+courseid)
    if (!mongoose.Types.ObjectId.isValid(courseid)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        const course = await Course.findById(courseid)
        if (!course) {
            return res.status(404).json({ error: 'course not found' })
        }
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}
const uploadPreview = async (req, res) => {
    const courseid = req.params.courseid
    const { videoLink } = req.body
    console.log('video embed link : ' + videoLink)
    if (!mongoose.Types.ObjectId.isValid(courseid)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        const course = await Course.findByIdAndUpdate(courseid, { PreviewVideo: videoLink })
        if (!course) {
            return res.status(404).json({ error: 'course not found' })
        }
        res.status(200).json(videoLink)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}
const getMySubtitles = async (req, res) => {
    const courseid = req.params.courseid
    const subtitles = []
    console.log('helloo getting subtitles ' + courseid)
    if (!mongoose.Types.ObjectId.isValid(courseid)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        const course = await Course.findById(courseid)
        if (!course) {
            return res.status(404).json({ error: 'course not found' })
        }
        console.log(course)
        console.log(course.Subtitle)
        const subids = course.Subtitle
        
        for(let i=0;i<subids.length;i++){
            const subid = subids[i]
            if (!mongoose.Types.ObjectId.isValid(subid)) {
                return res.status(404).json({ error: 'no such id' })
            }
            console.log('subid ' + subid)
            const subtitle = await Sub.findById(subid)
            console.log('subtitle isss ' + subtitle)
            if (!subtitle) {
                return res.status(500).json({ error: 'subtitle not found' })
            }
            subtitles.push(subtitle)
            console.log('gotten subs ' + subtitles)
        }
        console.log('gotten subs out of loop ' + subtitles)
        res.status(200).json(subtitles)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}
const owedPermonth = async(req,res) => {
    try {
        const id = req.user
        const courses = await Instructor.findOne({_id:id}).select("My_Courses")
        var price = 0
        for(i=0 ;i<courses.My_Courses.length;i++){
           console.log(courses.My_Courses[i])
           
           var course = await Course.findOne({_id:courses.My_Courses[i]})
           console.log(course.Count)
           console.log(course.Count)
           
           price = price + ((course.Price - (course.Price * course.Discount*0.1))*course.Count)
           console.log(price)     
        }

        res.status(200).json(price)
    } catch (error) {
        
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

const initiateCourse = async(req,res) => {
    try{
    const instructor_id = req.user;
    const {course,Subtitles} = req.body
    if (!mongoose.Types.ObjectId.isValid(instructor_id)) {
        return res.status(404).json({ error: "no such id" });
      }
      const instr = await Instructor.findById(instructor_id);
    let subIds = [];
    for(const sub of Subtitles){
        const videos = sub.Videos
        let vidIds = [];
        for(const vid of videos){
         const {_id} = await Video.create(vid)
         vidIds.push(_id)
        }
        const {_id} = await Sub.create({Title:sub.Title,Hours:parseInt(sub.Hours),Videos:vidIds,Exercises:sub.Exercises})
        subIds.push(_id)
     
    }
    const c =  await Course.create({Title:course.title,Subject:course.subject, Price:Number(course.price),Hours:course.totalHours,Summary:course.description,InstructorId:instructor_id,InstructorName: instr.Firstname + " " + instr.Lastname,Subtitle:subIds,PreviewVideo:course.previewLink})
    return res.status(200).json(c)
    }catch(e){
        res.status(400).json(e.message)
    }
}

const getMyRatings = async (req, res) => {
    const id = req.user
    console.log("Instructor id iss:: ")
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such id' })
    }
    try {
        const ratings = await instructorRatingModel.find({ InstructorId: id })
        console.log(ratings)
        res.status(200).json(ratings)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getMyProblems = async (req, res) => {
    const id = req.user
    console.log(id)
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
    console.log(problemID)
    console.log(comment)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such user id' })
    }
    if (!mongoose.Types.ObjectId.isValid(problemID)) {
        return res.status(404).json({ error: 'no such problem id' })
    }
    try {
        const problem = await Problem.findByIdAndUpdate(problemID,{ $push: { Comments: comment }})
        res.status(200).json(problem)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createCourse,
    viewAllInsCourses,
    editEmail,
    editBiography,
    defineDiscount,
    getRating,
    createSubtitle,
    createVideo,
    createExam,
    createQuestion,
    viewExams,
    searchCourse,
    setFlag,
    getInsDetails,
    EditInstructorinfo,
    owedPermonth,
    getCourse,
    uploadPreview,
    getMySubtitles,
    reportProblem,
    initiateCourse,
    getMyRatings,
    getMyProblems,
    addProblemComment,
}