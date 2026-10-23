import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'STUDENT' | 'PROFESSOR';

export interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
}

export interface Student extends User {
  rollNo: string;
  attendance: { total: number; present: number };
  schedule: Array<{ subject: string; time: string; room: string }>;
}

export interface Professor extends User {
  username: string;
  batches: Array<{ batchName: string; studentCount: number }>;
  lectures: Array<{ subject: string; time: string; batch: string }>;
}

interface AuthContextType {
  user: Student | Professor | null;
  role: UserRole | null;
  login: (role: UserRole, credentials: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Student | Professor | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  const login = (selectedRole: UserRole, credentials: any) => {
    // Mock login logic
    setRole(selectedRole);
    if (selectedRole === 'STUDENT') {
      setUser({
        id: 's1',
        name: 'John Doe',
        email: 'john@jecrc.ac.in',
        profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        rollNo: '2021CS101',
        attendance: { total: 100, present: 75 },
        schedule: [
          { subject: 'Data Structures', time: '09:00 AM', room: 'L-101' },
          { subject: 'Operating Systems', time: '11:00 AM', room: 'L-202' },
        ],
      });
    } else {
      setUser({
        id: 'p1',
        name: 'Dr. Smith',
        email: 'smith@jecrc.ac.in',
        profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Smith',
        username: 'prof_smith',
        batches: [
          { batchName: 'CS-A', studentCount: 60 },
          { batchName: 'CS-B', studentCount: 58 },
        ],
        lectures: [
          { subject: 'Algorithm Design', time: '10:00 AM', batch: 'CS-A' },
        ],
      });
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
