import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, BarChart3, TrendingUp, Calendar, Target, Award, User } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ReportsPage = () => {
  const { user, skills } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    setIsGenerating(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would trigger a download
      alert('PDF report generated and downloaded!');
    }, 2000);
  };

  const reportSections = [
    {
      title: "Career Overview",
      icon: User,
      description: "Your professional profile and career objectives",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Skills Analysis",
      icon: BarChart3,
      description: "Detailed breakdown of your current skill levels",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Learning Path",
      icon: Target,
      description: "Personalized roadmap for skill development",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Market Insights",
      icon: TrendingUp,
      description: "Industry trends and salary benchmarks",
      color: "from-orange-500 to-red-500"
    }
  ];

  const keyMetrics = [
    { label: "Total Skills", value: skills.length, icon: Award },
    { label: "Avg. Skill Level", value: `${Math.round(skills.reduce((acc, s) => acc + s.progress, 0) / skills.length) || 0}%`, icon: TrendingUp },
    { label: "Expert Skills", value: skills.filter(s => s.progress >= 80).length, icon: Target },
    { label: "Days Active", value: "45", icon: Calendar }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Career Reports</h1>
          <p className="text-white/70">Generate comprehensive reports and roadmaps for your career journey</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Report Generator */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">Personalized Career Report</h2>
                  <p className="text-white/70">Comprehensive analysis of your career progress</p>
                </div>
              </div>

              {/* Report Preview */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Report Contents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportSections.map((section, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-4"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`bg-gradient-to-r ${section.color} p-2 rounded-lg`}>
                          <section.icon className="h-4 w-4 text-white" />
                        </div>
                        <h4 className="text-white font-medium">{section.title}</h4>
                      </div>
                      <p className="text-white/60 text-sm">{section.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generatePDF}
                disabled={isGenerating}
                className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                  isGenerating 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                } text-white`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating Report...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    <span>Download Personalized Career Report</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* PDF Roadmap Generator */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-xl">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">Learning Roadmap</h2>
                  <p className="text-white/70">Structured plan for your skill development</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Roadmap Features</h3>
                <div className="space-y-3">
                  {[
                    "3, 6, and 12-month learning milestones",
                    "Recommended courses and resources",
                    "Project-based learning suggestions",
                    "Skill progression tracking",
                    "Industry certification paths"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => alert('PDF Roadmap generated!')}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Generate PDF Roadmap</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Sidebar - Key Metrics */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Key Metrics</h3>
              <div className="space-y-4">
                {keyMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center space-x-4"
                  >
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                      <metric.icon className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">{metric.value}</div>
                      <div className="text-white/60 text-sm">{metric.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: "Completed React Course", date: "2 days ago", type: "course" },
                  { action: "Updated Profile", date: "5 days ago", type: "profile" },
                  { action: "Skill Assessment", date: "1 week ago", type: "test" },
                  { action: "Generated Report", date: "2 weeks ago", type: "report" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      activity.type === 'course' ? 'bg-blue-400' :
                      activity.type === 'profile' ? 'bg-green-400' :
                      activity.type === 'test' ? 'bg-purple-400' : 'bg-orange-400'
                    }`} />
                    <div>
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-white/60 text-xs">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600/20 border border-blue-500/30 text-blue-200 py-2 px-4 rounded-lg hover:bg-blue-600/30 transition-colors text-left text-sm">
                  Export Skills Data
                </button>
                <button className="w-full bg-green-600/20 border border-green-500/30 text-green-200 py-2 px-4 rounded-lg hover:bg-green-600/30 transition-colors text-left text-sm">
                  Schedule Career Review
                </button>
                <button className="w-full bg-purple-600/20 border border-purple-500/30 text-purple-200 py-2 px-4 rounded-lg hover:bg-purple-600/30 transition-colors text-left text-sm">
                  Share Progress
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportsPage;