import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Bell, Calendar, BookOpen, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DATA = [
  { name: 'Present', value: 75, color: '#3b82f6' },
  { name: 'Absent', value: 25, color: '#e2e8f0' },
];

const SCHEDULE = [
  { subject: 'Data Structures', time: '09:00 AM', room: 'L-101', type: 'Lecture' },
  { subject: 'Discrete Math', time: '11:00 AM', room: 'L-202', type: 'Tutorial' },
  { subject: 'Digital Logic', time: '01:00 PM', room: 'L-105', type: 'Lecture' },
  { subject: 'English Comm', time: '03:00 PM', room: 'L-301', type: 'Lab' },
];

const NOTIFICATIONS = [
  { id: 1, text: 'Mid-semester exams start from Nov 15th.', time: '2h ago', priority: 'high' },
  { id: 2, text: 'Workshop on AI/ML registered by tomorrow.', time: '5h ago', priority: 'medium' },
  { id: 3, text: 'Library clearance required for hostel renewal.', time: '1d ago', priority: 'low' },
];

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const student = user as any; // Cast to access student properties

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome back, <span className="text-blue-600 dark:text-blue-400">{student?.name}!</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Here is what's happening with your academics today.</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Current Semester</div>
          <div className="text-xl font-bold">Semester 4 (CS)</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Main Stats */}
        <div className="col-span-8 space-y-8">

          {/* Attendance Visualization Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex items-center">
            <div className="w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 pl-8">
              <h3 className="text-xl font-bold mb-2">Overall Attendance</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black text-blue-600 dark:text-blue-400">75%</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">Average</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                You are currently meeting the minimum attendance requirement. Keep it up to maintain your eligibility for finals!
              </p>
            </div>
          </div>

          {/* Today's Schedule Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Calendar size={20} />
                </div>
                <h3 className="text-xl font-bold">Today's Schedule</h3>
              </div>
              <span className="text-sm font-medium text-slate-400">{new Date().toDateString()}</span>
            </div>

            <div className="space-y-4">
              {SCHEDULE.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-bold text-slate-400 dark:text-slate-500 w-20">
                      {item.time}
                    </div>
                    <div>
                      <div className="font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.subject}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <BookOpen size={12} /> {item.type} • Room {item.room}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    Upcoming
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Notifications */}
        <div className="col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                <Bell size={20} />
              </div>
              <h3 className="text-xl font-bold">Announcements</h3>
            </div>

            <div className="space-y-6">
              {NOTIFICATIONS.map((note) => (
                <div key={note.id} className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                  <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full ${
                    note.priority === 'high' ? 'bg-red-500' : note.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} />
                  <p className="text-sm font-medium leading-relaxed mb-1">
                    {note.text}
                  </p>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {note.time}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all">
              View All Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
