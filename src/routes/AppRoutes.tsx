import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { LayoutWrapper } from '../components/layout/LayoutWrapper';
import { useAuth } from '../context/AuthContext';
import { StudentDashboard } from '../pages/student/Dashboard';
import { StudentAttendance } from '../pages/student/Attendance';
import { StudentTimetable } from '../pages/student/Timetable';
import { StudentAssignments } from '../pages/student/Assignments';
import { StudentAnnouncements, StudentProfile } from '../pages/student/OtherPages';
import { ProfessorDashboard } from '../pages/professor/Dashboard';
import { ProfessorTimetable } from '../pages/professor/Timetable';
import { ProfessorAssignments } from '../pages/professor/Assignments';
import { ProfessorAnnouncements, ProfessorProfile } from '../pages/professor/OtherPages';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role: 'STUDENT' | 'PROFESSOR' }) => {
  const { role: userRole } = useAuth();
  if (!userRole) return <Navigate to="/" replace />;
  if (userRole !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute role="STUDENT">
          <LayoutWrapper />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="timetable" element={<StudentTimetable />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="announcements" element={<StudentAnnouncements />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Professor Routes */}
      <Route path="/professor" element={
        <ProtectedRoute role="PROFESSOR">
          <LayoutWrapper />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<ProfessorDashboard />} />
        <Route path="timetable" element={<ProfessorTimetable />} />
        <Route path="assignments" element={<ProfessorAssignments />} />
        <Route path="announcements" element={<ProfessorAnnouncements />} />
        <Route path="profile" element={<ProfessorProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
