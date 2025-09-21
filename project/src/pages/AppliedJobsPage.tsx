import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Building, MapPin, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AppliedJobsPage = () => {
  const { appliedJobs, setAppliedJobs } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    status: 'applied' as const,
    appliedDate: new Date().toISOString().split('T')[0]
  });

  const addJob = () => {
    if (newJob.title && newJob.company) {
      const job = {
        id: Date.now().toString(),
        ...newJob
      };
      setAppliedJobs([...appliedJobs, job]);
      setNewJob({
        title: '',
        company: '',
        status: 'applied',
        appliedDate: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
    }
  };

  const updateJobStatus = (jobId: string, newStatus: string) => {
    setAppliedJobs(appliedJobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus as any } : job
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return { icon: Clock, color: 'text-yellow-400' };
      case 'interview': return { icon: Eye, color: 'text-blue-400' };
      case 'accepted': return { icon: CheckCircle, color: 'text-green-400' };
      case 'rejected': return { icon: XCircle, color: 'text-red-400' };
      default: return { icon: AlertCircle, color: 'text-gray-400' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30';
      case 'interview': return 'bg-blue-500/20 text-blue-200 border-blue-500/30';
      case 'accepted': return 'bg-green-500/20 text-green-200 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-200 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-200 border-gray-500/30';
    }
  };

  const statusOptions = [
    { value: 'applied', label: 'Applied' },
    { value: 'interview', label: 'Interview' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' }
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
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Job Applications</h1>
            <p className="text-white/70">Track your job application progress</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Application</span>
          </motion.button>
        </motion.div>

        {/* Add Job Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Add New Application</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                placeholder="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Company"
                value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={newJob.status}
                onChange={(e) => setNewJob({ ...newJob, status: e.target.value as any })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={newJob.appliedDate}
                onChange={(e) => setNewJob({ ...newJob, appliedDate: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addJob}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Application
              </motion.button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {statusOptions.map((status, index) => {
            const count = appliedJobs.filter(job => job.status === status.value).length;
            const StatusIcon = getStatusIcon(status.value).icon;
            const color = getStatusIcon(status.value).color;
            
            return (
              <motion.div
                key={status.value}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <StatusIcon className={`h-8 w-8 ${color}`} />
                  <span className="text-2xl font-bold text-white">{count}</span>
                </div>
                <p className="text-white/70 text-sm capitalize">{status.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Job Applications List */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {appliedJobs.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
              <Building className="h-16 w-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Applications Yet</h3>
              <p className="text-white/60 mb-6">Start tracking your job applications to stay organized</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Add Your First Application
              </motion.button>
            </div>
          ) : (
            appliedJobs.map((job, index) => {
              const StatusIcon = getStatusIcon(job.status).icon;
              
              return (
                <motion.div
                  key={job.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                          <Building className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                          <p className="text-white/70 mb-2">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Applied: {new Date(job.appliedDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>Remote</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(job.status)}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{job.status}</span>
                      </div>
                      
                      <select
                        value={job.status}
                        onChange={(e) => updateJobStatus(job.id, e.target.value)}
                        className="bg-white/5 border border-white/20 rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-gray-800">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AppliedJobsPage;