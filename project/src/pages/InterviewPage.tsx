import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Upload, FileText, Zap, CheckCircle, Clock, TrendingUp, Target } from 'lucide-react';

const InterviewPage = () => {
  const [resumeText, setResumeText] = useState('');
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isInterviewMode, setIsInterviewMode] = useState(false);

  const techQuestions = [
    "Tell me about yourself and your technical background.",
    "What programming languages are you most comfortable with?",
    "Describe a challenging project you've worked on recently.",
    "How do you stay updated with the latest technologies?",
    "Explain the difference between REST and GraphQL APIs.",
    "What is your approach to debugging complex issues?",
    "How do you handle version control in team projects?",
    "Describe your experience with cloud platforms.",
    "What testing strategies do you implement in your projects?",
    "How would you optimize the performance of a web application?"
  ];

  const analyzeResume = () => {
    // Simulate ATS analysis
    const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
    setAtsScore(score);
  };

  const startMockInterview = () => {
    const shuffled = [...techQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 5));
    setCurrentQuestion(0);
    setIsInterviewMode(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsInterviewMode(false);
      setCurrentQuestion(0);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

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
          <h1 className="text-4xl font-bold text-white mb-2">Interview & Resume Tools</h1>
          <p className="text-white/70">Practice interviews and optimize your resume with AI assistance</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Mock Interview */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">AI Mock Interview Assistant</h2>
            </div>

            {!isInterviewMode ? (
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Interview Preparation</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                      <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">5</div>
                      <div className="text-white/70 text-sm">Questions</div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                      <Clock className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">15-20</div>
                      <div className="text-white/70 text-sm">Minutes</div>
                    </div>
                  </div>
                  <p className="text-white/70 mb-6">
                    Practice with our AI-powered mock interview system. Get real-time feedback on your answers
                    and improve your technical communication skills.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startMockInterview}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Start Mock Interview</span>
                  </motion.button>
                </div>

                {/* Interview Tips */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Interview Tips</h3>
                  <div className="space-y-3">
                    {[
                      "Research the company and role thoroughly",
                      "Prepare specific examples using the STAR method",
                      "Practice coding problems on a whiteboard",
                      "Ask thoughtful questions about the role and team"
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span className="text-white/80 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Mock Interview in Progress</h3>
                    <span className="text-blue-200 text-sm">
                      {currentQuestion + 1} of {selectedQuestions.length}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / selectedQuestions.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                    <p className="text-white text-lg leading-relaxed">
                      {selectedQuestions[currentQuestion]}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextQuestion}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {currentQuestion < selectedQuestions.length - 1 ? 'Next Question' : 'Finish Interview'}
                    </motion.button>
                    <button
                      onClick={() => setIsInterviewMode(false)}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      End Interview
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* AI Resume Improver */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">AI Resume Improver</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3">
                  Paste your resume text or upload a file
                </label>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-white/50 mx-auto mb-4" />
                    <p className="text-white/70 mb-4">Drag & drop your resume file here</p>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Choose File
                    </button>
                  </div>
                  <div className="text-center text-white/50">or</div>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume text here..."
                    rows={8}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={analyzeResume}
                disabled={!resumeText.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="h-5 w-5" />
                <span>Analyze Resume</span>
              </motion.button>

              {atsScore !== null && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">ATS Analysis Results</h3>
                  <div className="text-center mb-4">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(atsScore)}`}>
                      {atsScore}%
                    </div>
                    <div className="text-white/70">ATS Compatibility Score</div>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-6">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getScoreGradient(atsScore)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${atsScore}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Keyword Match</span>
                      <span className="text-green-400">Good</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Formatting</span>
                      <span className="text-yellow-400">Needs Improvement</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Content Structure</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Recommendations:</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Add more industry-specific keywords</li>
                      <li>• Use bullet points for better readability</li>
                      <li>• Quantify your achievements with numbers</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewPage;