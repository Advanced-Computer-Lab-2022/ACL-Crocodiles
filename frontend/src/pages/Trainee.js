import { Link } from "react-router-dom"
const Trainee = () => {
    return (

        <div className="trainee">
            <div class="topnav">
                <Link to="/filter">
                    <input type="button" value="Filter" />
                </Link>
                <Link to="/course">
                    <input type="button" value="View All Courses" />
                </Link>
                <Link to="/Mycourses">
                    <input type="button" value="View My Courses" />
                </Link>
            </div>

        </div>



    )
}
export default Trainee