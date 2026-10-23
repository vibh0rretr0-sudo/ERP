import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIMESLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

const TIMETABLE_DATA: Record<string, Record<string, any>> = {
  'Monday': { '09:00 AM': { subject: 'Data Structures', room: 'L-101', type: 'Lecture' }, '11:00 AM': { subject: 'Discrete Math', room: 'L-202', type: 'Tutorial' }, '02:00 PM': { subject: 'English', room: 'L-301', type: 'Lecture' } },
  'Tuesday': { '10:00 AM': { subject: 'Digital Logic', room: 'L-105', type: 'Lecture' }, '01:00 PM': { subject: 'Operating Systems', room: 'L-202', type: 'Lab' } },
  'Wednesday': { '09:00 AM': { subject: 'Data Structures', room: 'L-101', type: 'Lecture' }, '11:00 AM': { subject: 'Discrete Math', room: 'L-202', type: 'Lecture' }, '03:00 PM': { subject: 'Sports', room: 'Ground', type: 'Activity' } },
  'Thursday': { '10:00 AM': { subject: 'Digital Logic', room: 'L-105', type: 'Lecture' }, '01:00 PM': { subject: 'Operating Systems', room: 'L-202', type: 'Lecture' } },
  'Friday': { '09:00 AM': { subject: 'Data Structures', room: 'L-101', type: 'Tutorial' }, '11:00 AM': { subject: 'Discrete Math', room: 'L-202', type: 'Lecture' }, '02:00 PM': { subject: 'English', room: 'L-301', type: 'Lecture' } },
  'Saturday': { '10:00 AM': { subject: 'Guest Lecture', room: 'Auditorium', type: 'Seminar' } },
};

export const StudentTimetable: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Weekly Timetable</h1>
        <p className="text-slate-500 dark:text-slate-400">Your academic schedule for the current semester.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 border-r border-slate-200 dark:border-slate-800">Time</th>
                {DAYS.map(day => <th key={day} className="px-6 py-4 text-center">{day}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {TIMESLOTS.map(time => (
                <tr key={time} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-400 dark:text-slate-500 text-sm border-r border-slate-200 dark:border-slate-800">
                    {time}
                  </td>
                  {DAYS.map(day => {
                    const slot = TIMETABLE_DATA[day]?.[time];
                    return (
                      <td key={day} className="px-4 py-2 text-center">
                        {slot ? (
                          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-left transition-transform hover:scale-[1.02]">
                            <div className="text-sm font-bold text-blue-700 dark:text-blue-400 truncate">{slot.subject}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                              <MapPin size={10} /> {slot.room}
                            </div>
                          </div>
                        ) : (
                          <div className="h-12" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
