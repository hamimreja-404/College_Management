import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login1 from './Components/login/Login.jsx';
import StudentDashboard1 from './Components/Dashboard/StudentDashboard.jsx';
import SuperAdminDashboard1 from './Components/Dashboard/SuperAdminDashboard.jsx';
import AdminDashboard1 from './Components/Dashboard/AdminDashboard.jsx';
import LandingPage from './Components/HomePage.jsx';
import AboutUs from './Components/About.jsx';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        // Home Page 
        <Route path="/" element={<LandingPage/>} />
        // About Us Page
        <Route path="/about-us" element={<AboutUs/>} />
        // Login Page
        <Route path="/login" element={<Login1/>} />
        
        // Dashboards
        <Route path="/student-dashboard" element={<StudentDashboard1/>} />

        <Route path="/admin-dashboard" element={<AdminDashboard1 />} />

        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

