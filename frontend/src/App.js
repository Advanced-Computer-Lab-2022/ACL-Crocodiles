import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Course from './pages/Course'
import Admin from './pages/Admin'
import Instructor from './pages/Instructor'
import Guest from './pages/Guest'
import IndvTrainee from './pages/IndvTrainee'
import CorpTraineeCourses from './pages/CorpTraineeCourses'
import CorpTraineeHome from './pages/CorpTraineeHome'
import Search from './pages/Search'
import Filter from './pages/Filter'
import FilterCorpTrainee from './pages/FilterCorpTrainee'
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
              path="/guest"
              element={<Guest />}
            />
            <Route
              path="/indvTrainee"
              element={<IndvTrainee />}
            />
            
               <Route
              path="/corpTrainee/courses"
              element={<CorpTraineeCourses />}
            />
               <Route
              path="/corpTrainee"
              element={<CorpTraineeHome />}
            />
            <Route
              path="/search"
              element={<Search />}
            />
            <Route
              path="/Filter"
              element={<Filter/>}
            />
                <Route
              path="/filterCorpTrainee"
              element={<FilterCorpTrainee/>}
            />
          </Routes>
      
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
