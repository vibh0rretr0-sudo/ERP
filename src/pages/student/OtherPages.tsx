import React from 'react';
import { Mail, Megaphone, User, MapPin, Phone, GraduationCap, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ANNOUNCEMENTS = [
  { id: 1, title: 'Annual Tech Fest 2026', content: 'Registration is now open for the Annual Tech Fest. Submit your projects by end of October.', date: 'Oct 20', type: 'College-wide' },
  { id: 2, title: 'CS Department Meeting', content: 'Mandatory meeting for all 4th year CS students regarding placement drives.', date: 'Oct 22', type: 'Department' },
  { id: 3, title: 'Holiday Notice', content: 'College will remain closed on Oct 25th on account of local festival.', date: 'Oct 18', type: 'College-wide' },
];

export const StudentAnnouncements: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Announcements</h1>
        <p className="text-slate-500 dark:text-slate-400">Stay updated with the latest news from the college and your department.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ANNOUNCEMENTS.map((note) => (
          <div key={note.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex gap-6 items-start group hover:border-blue-300 dark:hover:border-blue-700 transition-all">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0">
              <Megaphone size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{note.title}</h3>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">{note.type}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                {note.content}
              </p>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{note.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const student = user as any;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Personal Details</h1>
        <p className="text-slate-500 dark:text-slate-400">Your academic and personal information.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Profile Image Card */}
        <div className="col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm text-center">
          <img src={student?.profilePic} className="w-32 h-32 rounded-full mx-auto border-4 border-blue-100 dark:border-blue-900 mb-6" alt="Profile" />
          <h2 className="text-2xl font-bold mb-1">{student?.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{student?.email}</p>
          <div className="flex justify-center gap-3">
            <button className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Edit Profile</button>
            <button className="px-4 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition-colors">View Documents</button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <div className="grid grid-cols-2 gap-8">
            <DetailItem icon={<User size={18}/>} label="Full Name" value={student?.name} />
            <DetailItem icon={<GraduationCap size={18}/>} label="Roll Number" value={student?.rollNo} />
            <DetailItem icon={<Mail size={18}/>} label="Email Address" value={student?.email} />
            <DetailItem icon={<Phone size={18}/>} label="Phone Number" value="+91 98765 43210" />
            <DetailItem icon={<MapPin size={18}/>} label="Address" value="Jaipur, Rajasthan, India" />
            <DetailItem icon={<BookOpen size={18}/>} label="Course" value="B.Tech Computer Science" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
    <div className="text-blue-600 dark:text-blue-400 mt-1">{icon}</div>
    <div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</div>
      <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{value}</div>
    </div>
  </div>
);
