import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </Router>
  );
}
