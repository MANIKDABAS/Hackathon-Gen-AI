import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import SkillsPage from './pages/SkillsPage';
import InterviewPage from './pages/InterviewPage';
import ReportsPage from './pages/ReportsPage';
import TestPage from './pages/TestPage';
import CareerDetailPage from './pages/CareerDetailPage';
import AppliedJobsPage from './pages/AppliedJobsPage';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/interview" element={<InterviewPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/career/:id" element={<CareerDetailPage />} />
              <Route path="/applied-jobs" element={<AppliedJobsPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;