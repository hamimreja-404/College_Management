import React from 'react';
// 1. Import routing components
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. Import your page components with updated paths
// Using absolute paths from the project root (/src/) is more reliable

import Login1 from './Components/login/Login.jsx';
import StudentDashboard1 from './Components/Dashboard/StD.jsx';
import SuperAdminDashboard1 from './Components/Dashboard/SAdminD.jsx';
import AdminDashboard1 from './Components/Dashboard/AdminD.jsx';
import LandingPage from './Components/HomePage.jsx';
import AboutUs from './Components/About.jsx';

function App() {
  return (
    // 3. Wrap your application with the Router
    <BrowserRouter>
      {/* 4. Define the routes (pages) for your application */}
      <Routes>
        {/* Route for the login page (the homepage) */}
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login1/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        {/* <Route path="/" element={<Login/>} /> */}
        {/* <Route path="/" element={<LoginPage/>} /> */}

        {/* Route for the dashboard page */}
        <Route path="/student-dashboard" element={<StudentDashboard1/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard1 />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

