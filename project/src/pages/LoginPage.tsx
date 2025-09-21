import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Users, TrendingUp, Target, Phone, User, Sparkles } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      setUser({
        name,
        phone,
        education: '',
        skills: [],
        interests: [],
        careerGoal: '',
        bio: ''
      });
      navigate('/profile');
    }
  };

  const features = [
    { icon: Brain, title: "AI-Powered Analysis", description: "Smart career recommendations based on your unique profile" },
    { icon: TrendingUp, title: "Market Insights", description: "Stay ahead with real-time job market trends and opportunities" },
    { icon: Target, title: "Goal Achievement", description: "Structured roadmaps to reach your career aspirations" },
    { icon: Users, title: "Expert Guidance", description: "Learn from industry professionals and success stories" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 opacity-90"
        />
        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-300/20 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">AI-Powered Career Guidance</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Your Personalized
              <motion.span
                className="block bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                AI Career Coach
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/80 mb-8 leading-relaxed"
            >
              Map your skills, explore career paths, and prepare for the future job market with our intelligent guidance system.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                >
                  <feature.icon className="h-8 w-8 text-purple-400 mb-2" />
                  <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-white/60 text-xs">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden lg:flex justify-center items-center space-x-4 mt-8"
            >
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-300/20 rounded-full p-4">
                <Users className="h-12 w-12 text-purple-400" />
              </div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-purple-300 text-2xl"
              >
                ➤
              </motion.div>
              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-300/20 rounded-full p-4">
                <Brain className="h-12 w-12 text-blue-400" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl w-16 h-16 mx-auto mb-4"
              >
                <Brain className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
              <p className="text-white/70">Begin your personalized career journey today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:shadow-lg"
              >
                Start My Career Journey
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                Join thousands of professionals who've found their dream careers
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;