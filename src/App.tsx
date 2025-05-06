import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Páginas principales

import ProtectedRoute from './ProtectedRoute';
import Admin from './pages/Admin'; // o el nombre que uses
import Navbar from './Navbar';
import Leaderboard from './pages/Leaderboard';
import Matches from './pages/Matches';
import Players from './pages/Players';
import Teams from './pages/Teams';
import Schedule from './pages/Schedule';
import Home from './pages/Home';
import MatchDetail from './pages/MatchDetail';
import AdminMatch from './pages/AdminMatch';







function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Schedule />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} /> */}
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/players" element={<Players />} />
        <Route path="/matches/:id" element={<MatchDetail />} />
        <Route path="/admin-match/:id" element={<AdminMatch />} />
        <Route
          path="/matches"
          element={
            <ProtectedRoute requiredRole="admin">
              <Matches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin', 'scorekeeper']}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

    </Router>
  );
}

export default App;
