import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Course from './pages/Course'
import Admin from './pages/Admin'
import Instructor from './pages/Instructor'
import TraineeHome from './pages/traineeHome'
import Trainee from './pages/Trainee'


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
              path="/api/trainee"
              element={<TraineeHome />}
             />
               <Route
              path="/api/trainee/courses"
              element={<Trainee />}
             />
                 
          </Routes>
     </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
