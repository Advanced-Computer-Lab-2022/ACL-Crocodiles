import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Course from './pages/Course'
import Admin from './pages/Admin'
import Instructor from './pages/Instructor'
import Trainee from './pages/Trainee'
import Search from './pages/Search'
<<<<<<< Updated upstream
import FilterByPrice from './pages/FilterByPrice'

=======
import Filter from './pages/Filter'
import InstructorCourses from './pages/InstructorCourses'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Contract from './pages/Contract'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword'
>>>>>>> Stashed changes
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
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
              path="/course"
              element={<Course />}
            />
            <Route
              path="/api/trainee/courses"
              element={<Trainee />}
            />
            <Route
              path="/search"
              element={<Search />}
            />
            <Route
              path="/filterbyprice"
              element={<FilterByPrice/>}
            />
<<<<<<< Updated upstream
=======
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/changePassword"
              element={<ChangePassword />}
            />
       
            
>>>>>>> Stashed changes
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
