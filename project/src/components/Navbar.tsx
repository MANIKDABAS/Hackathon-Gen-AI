import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Home, User, BarChart3, Zap, FileText, GraduationCap } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn } = useUser();

  if (location.pathname === '/' && !isLoggedIn) return null;

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/skills', label: 'Skills', icon: Zap },
    { path: '/interview', label: 'Interview Tools', icon: FileText },
    { path: '/test', label: 'Test', icon: GraduationCap },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl"
            >
              <Brain className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-white">CareerPath</span>
          </Link>

          <div className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:block text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;