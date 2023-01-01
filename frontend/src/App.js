import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Course from "./pages/Course";
import Admin from "./pages/Admin";
import Instructor from "./pages/Instructor";
import Trainee from "./pages/Trainee";
import CorpTrainee from "./pages/CorpTrainee";
import CorpTraineeCourse from "./pages/CorpTraineeCourses";
import CorpTraineeFilter from "./pages/CorpTraineeFilter";
import Guest from "./pages/Guest";
import Search from "./pages/Search";
import Filter from "./pages/Filter";
import InstructorCourses from "./pages/InstructorCourses";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
//import Profile from "./pages/Profile";
import TraineeProfile from './pages/TraineeProfile'
import InstructorProfile from './pages/Profile'
import Contract from "./pages/Contract";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DefineDiscount from "./pages/DefineDiscount";
import Exam from "./components/Exam";
import ExamTrainee from "./components/ExamTrainee";
import ExamSolutionTrainee from "./components/ExamSolutionTrainee";
import ExamCorpTrainee from "./components/ExamCorpTrainee";
import ExamSolutionCorpTrainee from "./components/ExamSolutionCorpTrainee";
import TraineeCourses from "./pages/TraineeCourses";
import TraineeCoursePage from "./pages/TraineeCoursePage";
import CorpTraineeMyCourses from "./pages/CorpTraineeMyCourses";
import CorpTraineeCoursePage from "./pages/CorpTraineeMyCoursePage";
import ChangePassword from "./pages/ChangePassword";
import AddSubtitle from "./pages/AddSubtitle";
import TraineeNavBar from "./components/TraineeNavBar";
import NavAssign from "./components/NavAssign";
import HomeAssign from "./components/HomeAssign";
import PreviewCourse from "./pages/PreviewCourse";
import TM from "./pages/TM";
import AdminPromo from './pages/AdminPromo'
import AdminAddUser from './pages/AdminAddUser'
import InstructorCreate from './pages/InstructorCreate'
import NewCreateCourse from './pages/NewCreateCourse'
import InstructorCourse from './components/InstructorCourse'
import ViewRatingsPage from './pages/ViewRatingsPage'
import Success from "./pages/Success";
import AdminCorpRequests from './pages/AdminCorpRequests'
import CorpCourses from './pages/CorpCourses'
import TraineeRefundRequests from "./pages/TraineeRefundRequests";
import AdminRefundRequest from "./pages/AdminRefundRequests";
import AdminProblems from "./pages/AdminProblems"
import InstructorRatingsPage from "./pages/InstructorRatingsPage";
import ViewMyProblems from "./pages/ViewMyProblems";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavAssign />
        <div className="pages">
          <Routes>
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/success" element={<Success />} />
            <Route path="/course/previewcourse" element={<PreviewCourse />} />
            <Route path="/termsandconditions" element={<TM />} />
            <Route path="/" element={<HomeAssign />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/instructor" element={<Instructor />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/course" element={<Course />} />
            <Route path="/Mycourses" element={<TraineeCourses />} />
            <Route path="/trainee" element={<Trainee />} />
            <Route path="/Mycourses/course" element={<TraineeCoursePage />} />
            <Route path="/CorpTrainee" element={<CorpTrainee />} />
            <Route path="/corpTraineeCourses" element={<CorpTraineeCourse />} />
            <Route path="/traineerefundrequests" element={<TraineeRefundRequests />} />
            <Route path="/adminrefundrequests" element={<AdminRefundRequest />} />
            <Route path="/adminproblems" element={<AdminProblems />} />
            <Route
              path="/CorpTraineeMyCourses/course"
              element={<CorpTraineeCoursePage />}
            />
            <Route
              path="/guest"
              element={<Guest />}
            />
            <Route
              path="/filter"
              element={<Filter />}
            />
            <Route
              path="/search"
              element={<Search />}
            />
            <Route
              path="/corpTraineeFilter"
              element={<CorpTraineeFilter />}
            />
            <Route
              path="/InstructorCourses"
              element={<InstructorCourses />}
            />
            <Route
              path="/createexam"
              element={<Exam />}
            />
            <Route
              path="/CorpTraineeMyCourses"
              element={<CorpTraineeMyCourses />}
            />
            <Route path="/createexam" element={<Exam />} />
            <Route path="/changePassword" element={<ChangePassword />} />{" "}
            <Route path="/viewExamCorp/:examid" element={<ExamCorpTrainee />} />
            <Route
              path="/viewSolutionCorp/:examid"
              element={<ExamSolutionCorpTrainee />}
            />
            <Route path="/addsubtitle/:courseid" element={<AddSubtitle />} />
            <Route
              path="/viewExam/:courseid/:examid"
              element={<ExamTrainee />}
            />
            <Route
              path="/viewSolution/:courseid/:examid"
              element={<ExamSolutionTrainee />}
            />
            <Route
              path="/adminpromo"
              element={<AdminPromo />}
            />
            <Route
              path="/instructorprofile"
              element={<InstructorProfile />}
            />
            <Route
              path="/traineeprofile"
              element={<TraineeProfile />}
            />
            <Route
              path="/adminadduser"
              element={<AdminAddUser />}
            />
            <Route
              path="/instructorcreate"
              element={<NewCreateCourse />}
            />
            <Route
              path="/instructorcourse/:courseid"
              element={<InstructorCourse />}
            />
            <Route
              path="/viewratings/:courseid"
              element={<ViewRatingsPage />}
            />
            <Route
              path="/admincorprequests"
              element={<AdminCorpRequests />}
            />
            <Route
              path="/corpcourses"
              element={<CorpCourses />}
            />
            <Route
              path="/myratings"
              element={<InstructorRatingsPage />}
            />
            <Route
              path="/myproblems"
              element={<ViewMyProblems />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
