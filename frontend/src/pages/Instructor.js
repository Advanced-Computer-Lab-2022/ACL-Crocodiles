import NewCourseForm from "../components/NewCourseForm"
import EditForm from "../components/EditInstructor"

const Instructor = () => {
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
                <a href="/contract">
                    <input type="button" value="View Contract" />
                </a>
            </div>
            <NewCourseForm />
            <EditForm/>
        </div>


    )
}
export default Instructor