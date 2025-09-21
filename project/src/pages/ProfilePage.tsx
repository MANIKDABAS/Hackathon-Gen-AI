import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, Save, Plus, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    education: user?.education || '',
    skills: user?.skills || [],
    interests: user?.interests || [],
    careerGoal: user?.careerGoal || '',
    bio: user?.bio || '',
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  const removeInterest = (index: number) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({
        ...user,
        ...formData
      });
      navigate('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Complete Your Profile</h1>
          <p className="text-white/70">Help us understand you better to provide personalized recommendations</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture & Resume Upload */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Profile Picture */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Profile Picture</h3>
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 cursor-pointer"
                >
                  <Camera className="h-12 w-12 text-white" />
                </motion.div>
                <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Upload Photo</span>
                </button>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Resume</h3>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-white/50 mx-auto mb-4" />
                <p className="text-white/70 mb-4">Drag & drop your resume here</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Choose File
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Form */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-6">
              {/* Bio */}
              <div>
                <label className="block text-white font-medium mb-2">About Yourself</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tell us about yourself, your passion, and what drives you..."
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-white font-medium mb-2">Education</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select your education level</option>
                  <option value="High School">High School</option>
                  <option value="Associate Degree">Associate Degree</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-white font-medium mb-2">Current Skills</label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Add a skill"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addSkill}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="hover:text-purple-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-white font-medium mb-2">Interests</label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                    className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Add an interest"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addInterest}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-pink-500/20 text-pink-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{interest}</span>
                      <button
                        type="button"
                        onClick={() => removeInterest(index)}
                        className="hover:text-pink-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Career Goal */}
              <div>
                <label className="block text-white font-medium mb-2">Career Goal</label>
                <textarea
                  value={formData.careerGoal}
                  onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your ideal career path and goals..."
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Save Profile & Continue</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;