import React from 'react';
import { FileUp, Plus, Search } from 'lucide-react';

const MOCK_ASSIGNMENTS = [
  { id: 1, batch: 'CS-A', title: 'Binary Search Tree Lab', deadline: '2026-11-05', studentsSubmitted: 42, totalStudents: 60 },
  { id: 2, batch: 'CS-B', title: 'OS Kernel Analysis', deadline: '2026-10-30', studentsSubmitted: 30, totalStudents: 58 },
  { id: 3, batch: 'IT-A', title: 'TCP/IP Stack Design', deadline: '2026-11-10', studentsSubmitted: 15, totalStudents: 62 },
];

export const ProfessorAssignments: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Assignment Manager</h1>
          <p className="text-slate-500 dark:text-slate-400">Create, upload, and track student submissions per batch.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
          <Plus size={20} /> Create New
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_ASSIGNMENTS.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center justify-between group hover:border-blue-300 dark:hover:border-blue-700 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <FileUp size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{item.batch}</span>
                  <span className="text-xs text-slate-400">• {item.deadline}</span>
                </div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{item.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-tighter">Submissions</div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{item.studentsSubmitted}/{item.totalStudents}</div>
              </div>
              <button className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                Grade All
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
