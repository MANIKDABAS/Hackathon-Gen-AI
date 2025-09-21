import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, ChevronDown, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI career advisor work?",
      answer: "Our AI analyzes your skills, interests, and career goals to provide personalized recommendations and learning paths."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption to protect your personal information and career data."
    },
    {
      question: "Can I update my profile information?",
      answer: "Absolutely! You can update your skills, interests, and career goals anytime from your profile page."
    },
    {
      question: "How often are career recommendations updated?",
      answer: "Our AI updates recommendations based on market trends and your profile changes in real-time."
    }
  ];

  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Help/FAQ Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-white/60" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-white/80">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-white/80">© 2025 AI Career Advisor | Built at Hackathon</p>
          </div>
          
          <div className="flex space-x-4">
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-800 p-3 rounded-full text-white hover:bg-gray-900 transition-colors"
            >
              <Github className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;