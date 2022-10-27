import NewCourseForm from "../components/NewCourseForm"

const Instructor = () => {
    return(

        <div className="instructor">
            <h1>Instructor Page</h1>
        <div class="topnav">
            <input type="text" placeholder="Search course by Title or Subject"/>
            <a href="/course">
            <input type="button" value="viewAllCourses" />
            </a>
        </div>
            <NewCourseForm/>
            </div>
    

)}
export default Instructor