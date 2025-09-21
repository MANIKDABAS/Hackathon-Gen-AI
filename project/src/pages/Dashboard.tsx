import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Zap, BookOpen, DollarSign, Calendar, ExternalLink, Target, Users, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const { user } = useUser();

  const careerPaths = [
    {
      id: 1,
      title: "Full Stack Developer",
      description: "Build end-to-end web applications with modern technologies",
      salaryRange: "$70k - $120k",
      demand: "High",
      growth: "+22%",
      skills: ["React", "Node.js", "Python", "AWS"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 2,
      title: "Data Scientist",
      description: "Analyze complex data to drive business decisions",
      salaryRange: "$85k - $150k",
      demand: "Very High",
      growth: "+31%",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: "UX Designer",
      description: "Create intuitive and beautiful user experiences",
      salaryRange: "$60k - $110k",
      demand: "High",
      growth: "+13%",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const skillData = [
    { subject: 'Programming', A: 80, fullMark: 100 },
    { subject: 'Design', A: 60, fullMark: 100 },
    { subject: 'Analytics', A: 70, fullMark: 100 },
    { subject: 'Leadership', A: 50, fullMark: 100 },
    { subject: 'Communication', A: 75, fullMark: 100 },
    { subject: 'Problem Solving', A: 85, fullMark: 100 },
  ];

  const roadmapItems = [
    {
      period: "Next 3 Months",
      items: [
        { title: "Complete React Fundamentals", type: "course", progress: 60 },
        { title: "Build Portfolio Website", type: "project", progress: 30 },
        { title: "Learn TypeScript Basics", type: "course", progress: 0 }
      ],
      color: "bg-blue-500"
    },
    {
      period: "Next 6 Months",
      items: [
        { title: "Advanced React Patterns", type: "course", progress: 0 },
        { title: "Full Stack E-commerce Project", type: "project", progress: 0 },
        { title: "System Design Basics", type: "course", progress: 0 }
      ],
      color: "bg-purple-500"
    },
    {
      period: "Next Year",
      items: [
        { title: "Cloud Computing Certification", type: "certification", progress: 0 },
        { title: "Open Source Contributions", type: "project", progress: 0 },
        { title: "Technical Interview Preparation", type: "course", progress: 0 }
      ],
      color: "bg-pink-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-white/70">Here's your personalized career dashboard</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { icon: Target, label: "Career Goals", value: "3 Active", color: "text-blue-400" },
            { icon: Users, label: "Skill Level", value: "Intermediate", color: "text-green-400" },
            { icon: Award, label: "Completed", value: "12 Courses", color: "text-purple-400" },
            { icon: TrendingUp, label: "Growth", value: "+15% This Month", color: "text-pink-400" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Paths */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Recommended Career Paths</h2>
                <Link to="/applied-jobs" className="text-purple-400 hover:text-purple-300 text-sm">
                  View All Applications →
                </Link>
              </div>
              <div className="space-y-6">
                {careerPaths.map((career, index) => (
                  <motion.div
                    key={career.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{career.title}</h3>
                        <p className="text-white/70 mb-3">{career.description}</p>
                      </div>
                      <div className={`bg-gradient-to-r ${career.color} p-2 rounded-lg`}>
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <DollarSign className="h-5 w-5 text-green-400 mx-auto mb-1" />
                        <p className="text-white/60 text-xs">Salary Range</p>
                        <p className="text-white font-semibold text-sm">{career.salaryRange}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <Zap className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                        <p className="text-white/60 text-xs">Demand</p>
                        <p className="text-white font-semibold text-sm">{career.demand}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <TrendingUp className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                        <p className="text-white/60 text-xs">Growth</p>
                        <p className="text-white font-semibold text-sm">{career.growth}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {career.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/career/${career.id}`}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all group-hover:scale-105"
                    >
                      <span>Explore Career Path</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Learning Roadmap */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Learning Roadmap</h2>
              <div className="space-y-6">
                {roadmapItems.map((roadmap, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-4 h-4 rounded-full ${roadmap.color}`} />
                      <h3 className="text-lg font-semibold text-white">{roadmap.period}</h3>
                      <Calendar className="h-4 w-4 text-white/60" />
                    </div>
                    <div className="space-y-3">
                      {roadmap.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <BookOpen className="h-4 w-4 text-blue-400" />
                            <span className="text-white font-medium">{item.title}</span>
                            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-200 rounded-full">
                              {item.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.progress}%` }}
                                transition={{ delay: 0.5 + itemIndex * 0.1, duration: 1 }}
                                className={`h-full ${roadmap.color}`}
                              />
                            </div>
                            <span className="text-white/60 text-sm">{item.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skill Gap Analysis */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Skill Gap Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillData}>
                    <PolarGrid stroke="rgba(255,255,255,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 12 }} />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                    />
                    <Radar
                      name="Current Level"
                      dataKey="A"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <Link
                to="/skills"
                className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Zap className="h-4 w-4" />
                <span>Improve Skills</span>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/interview"
                  className="w-full bg-blue-600/20 border border-blue-500/30 text-blue-200 py-3 px-4 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center space-x-3"
                >
                  <Users className="h-5 w-5" />
                  <span>Practice Interview</span>
                </Link>
                <Link
                  to="/test"
                  className="w-full bg-green-600/20 border border-green-500/30 text-green-200 py-3 px-4 rounded-lg hover:bg-green-600/30 transition-colors flex items-center space-x-3"
                >
                  <Award className="h-5 w-5" />
                  <span>Take Skill Test</span>
                </Link>
                <Link
                  to="/reports"
                  className="w-full bg-purple-600/20 border border-purple-500/30 text-purple-200 py-3 px-4 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center space-x-3"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Generate Report</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;