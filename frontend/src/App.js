import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Course from './pages/Course'
import Admin from './pages/Admin'
import Instructor from './pages/Instructor'
import Trainee from './pages/Trainee'
import Search from './pages/Search'
import FilterByPrice from './pages/Filter'

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
              path="/trainee"
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
