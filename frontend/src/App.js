import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Course from './pages/Course'
import Admin from './pages/Admin'
import Instructor from './pages/Instructor'
import Trainee from './pages/Trainee'
import CorpTrainee from './pages/CorpTrainee'
import CorpTraineeCourse from './pages/CorpTraineeCourses'
import CorpTraineeFilter from './pages/CorpTraineeFilter'
import Guest from './pages/Guest'
import Search from './pages/Search'
import Filter from './pages/Filter'
import InstructorCourses from './pages/InstructorCourses'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Contract from './pages/Contract'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DefineDiscount from './pages/DefineDiscount'
import Exam from './components/Exam'
import ExamTrainee from './components/ExamTrainee'


import TraineeCourses from './pages/TraineeCourses'
import TraineeCoursePage from './pages/TraineeCoursePage'
import CorpTraineeMyCourses from './pages/CorpTraineeMyCourses'
import CorpTraineeCoursePage from './pages/CorpTraineeMyCoursePage'
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/resetpassword"
              element={<ResetPassword />}
            />
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword />}
            />

            <Route
              path="/contract"
              element={<Contract />}
            />
            <Route
              path="/instructor"
              element={<Instructor />}
            />
            <Route
              path="/admin"
              element={<Admin />}
            />
            <Route
              path="/signin"
              element={<Signin />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/course"
              element={<Course />}
            />
            <Route
              path="/Mycourses"
              element={<TraineeCourses />}
            />
            <Route
              path="/trainee"
              element={<Trainee />}
            />
            <Route
              path="/Mycourses/course"
              element={<TraineeCoursePage />}
            />
            <Route
              path="/CorpTrainee"
              element={<CorpTrainee />}
            />
            <Route
              path="/corpTraineeCourses"
              element={<CorpTraineeCourse />}
            />
            <Route
              path="/CorpTraineeMyCourses/course"
              element={<CorpTraineeCoursePage />}
            />
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
            {/* <Route
              path="/createexam/:courseid"
              element={<Exam />}
            /> */}
            <Route
              path="/createexam"
              element={<Exam />}
            />
            <Route
              path="/CorpTraineeMyCourses"
              element={<CorpTraineeMyCourses />}
            />

            <Route
              path="/definediscount/:courseid"
              element={<DefineDiscount />}
            />
            <Route
              path="/viewExam/:examid"
              element={<ExamTrainee />}
            />


          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
