import NewCourseForm from "../components/NewCourseForm"
import { useNavigate } from 'react-router-dom'

//import ExamForm from "./ExamForm"
//import SearchCourses from "../components/SearchCourses"

const Instructor = () => {
    let navigate = useNavigate()
    async function CreateExam() {

        await fetch('/api/instructor/createexam', {
            method: 'POST'
        })


        navigate('/createExam')
    }
    return (

        <div className="instructor">
            <h1>Instructor Page</h1>
            <div class="topnav">
                <a href="/search">
                    <input type="button" value="Search by instructorID" />
                </a>
                <a href="/filter">
                    <input type="button" value="Filter" />
                </a>
                <a href="/course">
                    <input type="button" value="View All Courses" />
                </a>
                <a href="/InstructorCourses">
                    <input type="button" value="View My Courses" />
                </a>

            </div>
            <NewCourseForm />


            <button onClick={CreateExam}>Create Exam</button>


        </div>



    )
}
export default Instructor