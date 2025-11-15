import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tests from './pages/Tests';
import Therapy from './pages/Therapy';
import Chatbot from './pages/chatbot';
import Games from './pages/Games';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/therapy" element={<Therapy />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/games" element={<Games />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} /> {/* Default to Login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;