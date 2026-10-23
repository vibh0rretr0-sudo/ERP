import React from 'react';
import { Bell, Megaphone, User, MapPin, Phone, GraduationCap, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const BATCH_ANNOUNCEMENTS = [
  { id: 1, batch: 'CS-A', title: 'Lab Submission Deadline', content: 'The deadline for the BST implementation has been extended to Nov 10th.', date: 'Oct 21', priority: 'high' },
  { id: 2, batch: 'CS-B', title: 'Guest Lecture', content: 'Join us for a session on Quantum Computing by Dr. Alan in L-202 tomorrow.', date: 'Oct 22', priority: 'medium' },
  { id: 3, batch: 'IT-A', title: 'Course Material', content: 'Lecture notes for Week 4 have been uploaded to the portal.', date: 'Oct 19', priority: 'low' },
];

export const ProfessorAnnouncements: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Batch Announcements</h1>
          <p className="text-slate-500 dark:text-slate-400">Broadcast updates and notices to specific student batches.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
          <Megaphone size={20} /> Post Notice
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {BATCH_ANNOUNCEMENTS.map((note) => (
          <div key={note.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex gap-6 items-start group hover:border-blue-300 dark:hover:border-blue-700 transition-all">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0">
              <Bell size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{note.title}</h3>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{note.batch}</span>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{note.date}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                {note.content}
              </p>
              <div className="flex gap-4">
                <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Edit Notice</button>
                <button className="text-xs font-bold text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProfessorProfile: React.FC = () => {
  const { user } = useAuth();
  const professor = user as any;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Professional Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">Faculty academic and contact information.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm text-center">
          <img src={professor?.profilePic} className="w-32 h-32 rounded-full mx-auto border-4 border-blue-100 dark:border-blue-900 mb-6" alt="Profile" />
          <h2 className="text-2xl font-bold mb-1">{professor?.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{professor?.email}</p>
          <div className="flex justify-center gap-3">
            <button className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Edit Details</button>
          </div>
        </div>

        <div className="col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <div className="grid grid-cols-2 gap-8">
            <DetailItem icon={<User size={18}/>} label="Full Name" value={professor?.name} />
            <DetailItem icon={<GraduationCap size={18}/>} label="Designation" value="Associate Professor" />
            <DetailItem icon={<Mail size={18}/>} label="Email" value={professor?.email} />
            <DetailItem icon={<Phone size={18}/>} label="Contact" value="+91 90000 11111" />
            <DetailItem icon={<MapPin size={18}/>} label="Office" value="Block B, Room 204" />
            <DetailItem icon={<BookOpen size={18}/>} label="Specialization" value="Distributed Systems" />
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
