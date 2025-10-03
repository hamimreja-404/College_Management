import React from 'react';
// 1. Import routing components
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. Import your page components with updated paths
// Using absolute paths from the project root (/src/) is more reliable
import Login from '/src/Components/login/Login.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';

function App() {
  return (
    // 3. Wrap your application with the Router
    <BrowserRouter>
      {/* 4. Define the routes (pages) for your application */}
      <Routes>
        {/* Route for the login page (the homepage) */}
        <Route path="/" element={<Login />} />

        {/* Route for the dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

