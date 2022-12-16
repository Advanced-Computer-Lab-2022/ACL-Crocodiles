const Course = require('../models/courseModel').course
const mongoose = require('mongoose')
const CorpTrainee = require('../models/corporatetraineeModel')
const Exam = require('../models/examModel').exam

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

    const ID  = "6391383e89acbda5734e887c"
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


module.exports = {
    searchCourse,
    viewAllCourses,
    getMyCourses,
    findCourse,
    addAssignment,
    getAssignment,
    calculateGrade,
    viewExam
}
