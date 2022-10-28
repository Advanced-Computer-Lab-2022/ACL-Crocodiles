import NewCourseForm from "../components/NewCourseForm"
//import SearchCourses from "../components/SearchCourses"

const Instructor = () => {
    return(

        <div className="instructor">
            <h1>Instructor Page</h1>
        <div class="topnav">
            <a href="/search">
            <input type="button" value="Search by instructorID" />
            </a>
            <a href="/course">
            <input type="button" value="View All Courses" />
            </a>
        </div>
            <NewCourseForm/>
            </div>
    

)}
export default Instructor