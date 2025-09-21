import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, TrendingUp, MapPin, Clock, Users, Star, CheckCircle } from 'lucide-react';

const CareerDetailPage = () => {
  const { id } = useParams();

  const careerDetails = {
    1: {
      title: "Full Stack Developer",
      description: "Build end-to-end web applications with modern technologies",
      salaryRange: "$70k - $120k",
      demand: "High",
      growth: "+22%",
      skills: ["React", "Node.js", "Python", "AWS", "MongoDB", "TypeScript"],
      roadmap: {
        "0-3 months": [
          "Master HTML, CSS, and JavaScript fundamentals",
          "Learn React and component-based architecture",
          "Understand state management with Redux/Context",
          "Build your first full-stack application"
        ],
        "3-6 months": [
          "Master Node.js and Express.js",
          "Learn database design and SQL/NoSQL",
          "Implement authentication and authorization",
          "Deploy applications to cloud platforms"
        ],
        "6-12 months": [
          "Learn advanced React patterns and optimization",
          "Master API design and microservices",
          "Implement testing strategies (unit, integration, e2e)",
          "Contribute to open-source projects"
        ],
        "12+ months": [
          "Lead development projects and mentor juniors",
          "Architecture design and system scalability",
          "DevOps practices and CI/CD pipelines",
          "Stay updated with emerging technologies"
        ]
      },
      companies: ["Google", "Facebook", "Netflix", "Airbnb", "Uber"],
      locations: ["San Francisco", "New York", "Seattle", "Austin", "Remote"]
    }
  };

  const career = careerDetails[id as keyof typeof careerDetails];

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Career Path Not Found</h1>
          <Link to="/dashboard" className="text-purple-400 hover:text-purple-300">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">{career.title}</h1>
                <p className="text-xl text-white/80 mb-6">{career.description}</p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-green-400 font-semibold">{career.salaryRange}</div>
                  <div className="text-white/60 text-sm">Average Salary</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-blue-400 font-semibold">{career.growth}</div>
                  <div className="text-white/60 text-sm">Job Growth</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Roadmap */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Learning Roadmap</h2>
              <div className="space-y-6">
                {Object.entries(career.roadmap).map(([period, tasks], index) => (
                  <motion.div
                    key={period}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-4 h-4 rounded-full ${
                        index === 0 ? 'bg-green-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                      }`} />
                      <h3 className="text-lg font-semibold text-white">{period}</h3>
                      <Clock className="h-4 w-4 text-white/60" />
                    </div>
                    <div className="space-y-3">
                      {tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80">{task}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Required Skills */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Required Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {career.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/20 rounded-lg p-4 text-center"
                  >
                    <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-white font-medium">{skill}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Companies */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Top Hiring Companies</h3>
              <div className="space-y-3">
                {career.companies.map((company, index) => (
                  <div key={company} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white font-medium">{company}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span className="text-white/60 text-sm">Hiring</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Popular Locations */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Popular Locations</h3>
              <div className="space-y-3">
                {career.locations.map((location) => (
                  <div key={location} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <span className="text-white">{location}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Take Action</h3>
              <div className="space-y-3">
                <Link
                  to="/skills"
                  className="w-full bg-purple-600/20 border border-purple-500/30 text-purple-200 py-3 px-4 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center justify-center space-x-2"
                >
                  <Star className="h-4 w-4" />
                  <span>Update Skills</span>
                </Link>
                <Link
                  to="/test"
                  className="w-full bg-green-600/20 border border-green-500/30 text-green-200 py-3 px-4 rounded-lg hover:bg-green-600/30 transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Take Assessment</span>
                </Link>
                <Link
                  to="/reports"
                  className="w-full bg-blue-600/20 border border-blue-500/30 text-blue-200 py-3 px-4 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center justify-center space-x-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Generate Report</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerDetailPage;