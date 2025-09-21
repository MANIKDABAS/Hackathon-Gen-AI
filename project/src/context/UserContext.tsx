import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  phone: string;
  education: string;
  skills: string[];
  interests: string[];
  careerGoal: string;
  bio: string;
  photo?: string;
  resume?: string;
}

interface Skill {
  name: string;
  progress: number;
  category: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  status: 'applied' | 'interview' | 'rejected' | 'accepted';
  appliedDate: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  appliedJobs: Job[];
  setAppliedJobs: (jobs: Job[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

  const isLoggedIn = !!user;

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, skills, setSkills, appliedJobs, setAppliedJobs }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};