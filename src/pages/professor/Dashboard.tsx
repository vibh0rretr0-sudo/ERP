import React from 'react';
import {
  Users,
  Calendar,
  Clock,
  Bell,
  ArrowRight,
  BookOpen,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MOCK_BATCHES = [
  { id: 'b1', name: 'CS-A', students: 60, attendanceRate: '88%', activeAssignments: 3 },
  { id: 'b2', name: 'CS-B', students: 58, attendanceRate: '82%', activeAssignments: 2 },
  { id: 'b3', name: 'IT-A', students: 62, attendanceRate: '91%', activeAssignments: 4 },
];

const LECTURES = [
  { time: '09:00 AM', subject: 'Algorithm Design', batch: 'CS-A', room: 'L-101', status: 'Upcoming' },
  { time: '11:00 AM', subject: 'Operating Systems', batch: 'CS-B', room: 'L-202', status: 'Scheduled' },
  { time: '02:00 PM', subject: 'Compiler Design', batch: 'IT-A', room: 'L-105', status: 'Upcoming' },
];

const ADMIN_NOTICES = [
  { id: 1, text: 'Faculty meeting tomorrow at 3 PM in Conference Hall.', priority: 'high' },
  { id: 2, text: 'Submit your internal marks for Semester 4 by Friday.', priority: 'high' },
  { id: 3, text: 'New projector installed in L-202.', priority: 'low' },
];

export const ProfessorDashboard: React.FC = () => {
  const { user } = useAuth();
  const professor = user as any;

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome, <span className="text-blue-600 dark:text-blue-400">{professor?.name}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Faculty Portal & Academic Management System</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Designation</div>
          <div className="text-xl font-bold">Associate Professor (CSE)</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Batch & Lectures */}
        <div className="col-span-8 space-y-8">

          {/* Batch Overview */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <Users size={20} />
              </div>
              <h3 className="text-xl font-bold">Assigned Batches</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {MOCK_BATCHES.map((batch) => (
                <div
                  key={batch.id}
                  className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-lg font-black text-slate-800 dark:text-slate-200">{batch.name}</span>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Students</span>
                      <span className="font-bold">{batch.students}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Attendance</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{batch.attendanceRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Teaching Agenda */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  <Calendar size={20} />
                </div>
                <h3 className="text-xl font-bold">Today's Lecture Schedule</h3>
              </div>
              <span className="text-sm font-medium text-slate-400">{new Date().toDateString()}</span>
            </div>

            <div className="space-y-4">
              {LECTURES.map((lec, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-bold text-slate-400 dark:text-slate-500 w-20 flex items-center gap-2">
                      <Clock size={14} /> {lec.time}
                    </div>
                    <div>
                      <div className="font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {lec.subject}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <span className="font-bold text-blue-500">{lec.batch}</span> • Room {lec.room}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {lec.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Admin Notices */}
        <div className="col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                <Bell size={20} />
              </div>
              <h3 className="text-xl font-bold">Admin Notices</h3>
            </div>

            <div className="space-y-6">
              {ADMIN_NOTICES.map((note) => (
                <div key={note.id} className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                  <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full ${
                    note.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <p className="text-sm font-medium leading-relaxed mb-1">
                    {note.text}
                  </p>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Urgency: {note.priority}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all">
              Open Admin Inbox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
