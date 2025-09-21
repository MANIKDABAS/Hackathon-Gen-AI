import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, XCircle, Clock, Award, BookOpen, TrendingUp } from 'lucide-react';
import { useUser } from '../context/UserContext';

const TestPage = () => {
  const { user, skills } = useUser();
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const skillTests = {
    'React': [
      {
        question: "What is the correct way to create a React component?",
        options: [
          "function MyComponent() { return <div>Hello</div>; }",
          "const MyComponent = () => <div>Hello</div>;",
          "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
          "All of the above"
        ],
        correct: 3
      },
      {
        question: "What is the purpose of useEffect hook?",
        options: [
          "To manage component state",
          "To perform side effects in functional components",
          "To create context",
          "To handle events"
        ],
        correct: 1
      },
      {
        question: "How do you pass data from parent to child component?",
        options: [
          "Using state",
          "Using props",
          "Using context",
          "Using refs"
        ],
        correct: 1
      },
      {
        question: "What is JSX?",
        options: [
          "A JavaScript library",
          "A syntax extension for JavaScript",
          "A CSS framework",
          "A database query language"
        ],
        correct: 1
      },
      {
        question: "Which hook is used to manage component state?",
        options: [
          "useEffect",
          "useState",
          "useContext",
          "useReducer"
        ],
        correct: 1
      }
    ],
    'Python': [
      {
        question: "Which of the following is the correct way to define a function in Python?",
        options: [
          "function myFunc():",
          "def myFunc():",
          "define myFunc():",
          "func myFunc():"
        ],
        correct: 1
      },
      {
        question: "What does 'len()' function do in Python?",
        options: [
          "Returns the length of an object",
          "Creates a new list",
          "Sorts a list",
          "Converts to string"
        ],
        correct: 0
      },
      {
        question: "Which data type is mutable in Python?",
        options: [
          "String",
          "Tuple",
          "List",
          "Integer"
        ],
        correct: 2
      },
      {
        question: "What is the correct way to create a dictionary in Python?",
        options: [
          "dict = []",
          "dict = {}",
          "dict = ()",
          "dict = ''"
        ],
        correct: 1
      },
      {
        question: "Which operator is used for floor division in Python?",
        options: [
          "/",
          "//",
          "%",
          "**"
        ],
        correct: 1
      }
    ],
    'JavaScript': [
      {
        question: "What is the correct way to declare a variable in ES6?",
        options: [
          "var x = 5;",
          "let x = 5;",
          "const x = 5;",
          "Both let and const"
        ],
        correct: 3
      },
      {
        question: "Which method is used to add elements to the end of an array?",
        options: [
          "push()",
          "pop()",
          "shift()",
          "unshift()"
        ],
        correct: 0
      },
      {
        question: "What does '===' operator do in JavaScript?",
        options: [
          "Compares values only",
          "Compares both value and type",
          "Assigns a value",
          "Creates a variable"
        ],
        correct: 1
      },
      {
        question: "How do you create a function in JavaScript?",
        options: [
          "function myFunction() {}",
          "const myFunction = () => {}",
          "const myFunction = function() {}",
          "All of the above"
        ],
        correct: 3
      },
      {
        question: "What is a closure in JavaScript?",
        options: [
          "A way to close a program",
          "A function with access to outer scope variables",
          "A type of loop",
          "A conditional statement"
        ],
        correct: 1
      }
    ]
  };

  const availableSkills = Object.keys(skillTests);
  const currentTest = selectedSkill ? skillTests[selectedSkill as keyof typeof skillTests] : [];

  const startTest = () => {
    if (!selectedSkill) return;
    setIsTestActive(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setTestResults(null);
    setTimeLeft(300);
    
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex.toString();
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentTest.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    if (!selectedSkill) return;
    
    const correctAnswers = currentTest.reduce((count, question, index) => {
      return count + (parseInt(answers[index]) === question.correct ? 1 : 0);
    }, 0);
    
    const score = Math.round((correctAnswers / currentTest.length) * 100);
    const results = {
      skill: selectedSkill,
      score,
      correctAnswers,
      totalQuestions: currentTest.length,
      timeSpent: 300 - timeLeft,
      recommendations: getRecommendations(score)
    };
    
    setTestResults(results);
    setIsTestActive(false);
  };

  const getRecommendations = (score: number) => {
    if (score >= 80) {
      return [
        "Excellent performance! Consider advanced topics in this skill.",
        "Look into contributing to open source projects.",
        "Mentor others in this technology."
      ];
    } else if (score >= 60) {
      return [
        "Good foundation! Focus on advanced concepts.",
        "Practice more hands-on projects.",
        "Review areas where you scored lower."
      ];
    } else {
      return [
        "Start with fundamentals and basic concepts.",
        "Take structured online courses.",
        "Practice with guided tutorials and examples."
      ];
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Skill Assessment Tests</h1>
          <p className="text-white/70">Test your knowledge and get personalized learning recommendations</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isTestActive && !testResults && (
            <motion.div
              key="test-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Choose Your Skill Test</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {availableSkills.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSkill(skill)}
                    className={`p-6 rounded-xl cursor-pointer transition-all border-2 ${
                      selectedSkill === skill 
                        ? 'bg-purple-600/20 border-purple-500' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        selectedSkill === skill 
                          ? 'bg-purple-500' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      }`}>
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{skill}</h3>
                      <p className="text-white/60 text-sm">5 questions • 5 minutes</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {selectedSkill && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Test Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">{currentTest.length}</div>
                      <div className="text-white/60 text-sm">Questions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">5</div>
                      <div className="text-white/60 text-sm">Minutes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">Multiple</div>
                      <div className="text-white/60 text-sm">Choice</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-400">Instant</div>
                      <div className="text-white/60 text-sm">Results</div>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startTest}
                disabled={!selectedSkill}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="h-5 w-5" />
                <span>Start {selectedSkill} Test</span>
              </motion.button>
            </motion.div>
          )}

          {isTestActive && (
            <motion.div
              key="test-active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            >
              {/* Test Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{selectedSkill} Assessment</h2>
                  <p className="text-white/60">Question {currentQuestion + 1} of {currentTest.length}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-orange-400">
                    <Clock className="h-5 w-5" />
                    <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / currentTest.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-6">
                  {currentTest[currentQuestion]?.question}
                </h3>
                <div className="space-y-3">
                  {currentTest[currentQuestion]?.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => selectAnswer(index)}
                      className={`w-full text-left p-4 rounded-xl transition-all border-2 ${
                        answers[currentQuestion] === index.toString()
                          ? 'bg-purple-600/20 border-purple-500 text-white'
                          : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <div className="text-white/60 text-sm">
                  {answers[currentQuestion] && '✓ Answer selected'}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion]}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion < currentTest.length - 1 ? 'Next Question' : 'Finish Test'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {testResults && (
            <motion.div
              key="test-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Results Summary */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
                <div className="mb-6">
                  <div className={`text-6xl font-bold mb-2 ${
                    testResults.score >= 80 ? 'text-green-400' :
                    testResults.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {testResults.score}%
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {testResults.score >= 80 ? 'Excellent!' : 
                     testResults.score >= 60 ? 'Good Job!' : 'Keep Learning!'}
                  </h2>
                  <p className="text-white/70">
                    You got {testResults.correctAnswers} out of {testResults.totalQuestions} questions correct
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white font-semibold">{testResults.skill}</div>
                    <div className="text-white/60 text-sm">Skill Tested</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white font-semibold">{testResults.score}%</div>
                    <div className="text-white/60 text-sm">Score</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white font-semibold">{Math.floor(testResults.timeSpent / 60)}m {testResults.timeSpent % 60}s</div>
                    <div className="text-white/60 text-sm">Time Spent</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white font-semibold">
                      {testResults.score >= 80 ? 'Expert' :
                       testResults.score >= 60 ? 'Advanced' : 'Intermediate'}
                    </div>
                    <div className="text-white/60 text-sm">Level</div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Learning Recommendations</h3>
                </div>
                <div className="space-y-4">
                  {testResults.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <BookOpen className="h-4 w-4 text-purple-400" />
                      </div>
                      <p className="text-white/80">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedSkill('');
                    setTestResults(null);
                  }}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Take Another Test
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => alert('Results saved to your profile!')}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Results
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TestPage;