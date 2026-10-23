import React from 'react';
import { BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ATTENDANCE_DATA = [
  { subject: 'Data Structures', present: 18, total: 20, percentage: 90 },
  { subject: 'Discrete Mathematics', present: 15, total: 20, percentage: 75 },
  { subject: 'Operating Systems', present: 14, total: 20, percentage: 70 },
  { subject: 'Digital Logic', present: 19, total: 20, percentage: 95 },
  { subject: 'English Communication', present: 12, total: 20, percentage: 60 },
];

export const StudentAttendance: React.FC = () => {
  const { user } = useAuth();
  const student = user as any;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Attendance Breakdown</h1>
        <p className="text-slate-500 dark:text-slate-400">Detailed view of your subject-wise attendance for Semester 4.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Classes Attended</th>
              <th className="px-6 py-4">Total Classes</th>
              <th className="px-6 py-4">Percentage</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {ATTENDANCE_DATA.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200">{item.subject}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{item.present}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{item.total}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full max-w-[100px] overflow-hidden">
                      <div
                        className={`h-full ${item.percentage >= 75 ? 'bg-blue-500' : 'bg-red-500'}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{item.percentage}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.percentage >= 75 ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400">
                      <CheckCircle size={14} /> Sufficient
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400">
                      <AlertCircle size={14} /> Shortage
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
