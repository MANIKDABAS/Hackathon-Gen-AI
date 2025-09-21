import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, TrendingUp, Target, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

const SkillsPage = () => {
  const { skills, setSkills } = useUser();
  const [newSkill, setNewSkill] = useState({ name: '', progress: 0, category: 'Technical' });
  const [editingSkill, setEditingSkill] = useState<number | null>(null);

  const categories = ['Technical', 'Soft Skills', 'Languages', 'Tools', 'Other'];

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, { ...newSkill, name: newSkill.name.trim() }]);
      setNewSkill({ name: '', progress: 0, category: 'Technical' });
    }
  };

  const updateSkill = (index: number, updatedSkill: any) => {
    const updatedSkills = skills.map((skill, i) => i === index ? updatedSkill : skill);
    setSkills(updatedSkills);
    setEditingSkill(null);
  };

  const deleteSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-emerald-500';
    if (progress >= 60) return 'from-blue-500 to-indigo-500';
    if (progress >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getSkillLevel = (progress: number) => {
    if (progress >= 80) return { label: 'Expert', icon: Award };
    if (progress >= 60) return { label: 'Advanced', icon: TrendingUp };
    if (progress >= 40) return { label: 'Intermediate', icon: Target };
    return { label: 'Beginner', icon: Plus };
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
          <h1 className="text-4xl font-bold text-white mb-2">Skills Management</h1>
          <p className="text-white/70">Track your progress and identify areas for improvement</p>
        </motion.div>

        {/* Add New Skill */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Add New Skill</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Skill name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={newSkill.progress}
                onChange={(e) => setNewSkill({ ...newSkill, progress: parseInt(e.target.value) })}
                className="flex-1"
              />
              <span className="text-white w-12 text-center">{newSkill.progress}%</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addSkill}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Skill</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-8">
          {categories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + categoryIndex * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  <span>{category}</span>
                  <span className="text-sm text-white/60">({categorySkills.length})</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, index) => {
                    const actualIndex = skills.indexOf(skill);
                    const skillLevel = getSkillLevel(skill.progress);
                    const SkillIcon = skillLevel.icon;

                    return (
                      <motion.div
                        key={actualIndex}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-4"
                      >
                        {editingSkill === actualIndex ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => {
                                const updatedSkills = [...skills];
                                updatedSkills[actualIndex].name = e.target.value;
                                setSkills(updatedSkills);
                              }}
                              className="w-full bg-white/5 border border-white/20 rounded px-2 py-1 text-white text-sm"
                            />
                            <div className="flex items-center space-x-2">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={skill.progress}
                                onChange={(e) => {
                                  const updatedSkills = [...skills];
                                  updatedSkills[actualIndex].progress = parseInt(e.target.value);
                                  setSkills(updatedSkills);
                                }}
                                className="flex-1"
                              />
                              <span className="text-white text-xs w-8">{skill.progress}%</span>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingSkill(null)}
                                className="flex-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingSkill(null)}
                                className="flex-1 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <SkillIcon className="h-5 w-5 text-purple-400" />
                                <h4 className="font-medium text-white">{skill.name}</h4>
                              </div>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => setEditingSkill(actualIndex)}
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => deleteSkill(actualIndex)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-white/70 text-sm">{skillLevel.label}</span>
                                <span className="text-white/70 text-sm">{skill.progress}%</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.progress}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className={`h-full bg-gradient-to-r ${getProgressColor(skill.progress)}`}
                                />
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                skill.progress >= 80 ? 'bg-green-500/20 text-green-200' :
                                skill.progress >= 60 ? 'bg-blue-500/20 text-blue-200' :
                                skill.progress >= 40 ? 'bg-yellow-500/20 text-yellow-200' :
                                'bg-red-500/20 text-red-200'
                              }`}>
                                {skill.category}
                              </span>
                            </div>
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Summary */}
        {skills.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-purple-300/20 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Skills Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{skills.length}</div>
                <div className="text-white/70 text-sm">Total Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {skills.filter(s => s.progress >= 80).length}
                </div>
                <div className="text-white/70 text-sm">Expert Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {skills.filter(s => s.progress < 60).length}
                </div>
                <div className="text-white/70 text-sm">Need Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round(skills.reduce((acc, s) => acc + s.progress, 0) / skills.length) || 0}%
                </div>
                <div className="text-white/70 text-sm">Average Level</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SkillsPage;