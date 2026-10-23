import React from 'react';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ASSIGNMENTS = [
  { id: 1, subject: 'Data Structures', title: 'BST Implementation', deadline: '2026-11-01', status: 'Pending', priority: 'High' },
  { id: 2, subject: 'Discrete Math', title: 'Graph Theory Set 2', deadline: '2026-10-28', status: 'Submitted', priority: 'Medium' },
  { id: 3, subject: 'Operating Systems', title: 'Process Scheduling Lab', deadline: '2026-11-05', status: 'Pending', priority: 'High' },
  { id: 4, subject: 'Digital Logic', title: 'K-Map Analysis', deadline: '2026-10-25', status: 'Overdue', priority: 'Critical' },
];

export const StudentAssignments: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Subject Assignments</h1>
          <p className="text-slate-500 dark:text-slate-400">Track your academic submissions and deadlines.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100 dark:border-blue-800">
            2 Pending
          </div>
          <div className="px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-bold border border-green-100 dark:border-green-800">
            1 Submitted
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ASSIGNMENTS.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center justify-between group hover:border-blue-300 dark:hover:border-blue-700 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <FileText size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">{item.subject}</div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{item.title}</div>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Clock size={12} /> Deadline: {item.deadline}</span>
                  <span className={`flex items-center gap-1 ${item.priority === 'Critical' ? 'text-red-500' : 'text-slate-400'}`}>
                    <AlertCircle size={12} /> Priority: {item.priority}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                item.status === 'Submitted' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                item.status === 'Overdue' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {item.status}
              </div>
              <button className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
