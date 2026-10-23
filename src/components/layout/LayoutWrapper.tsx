import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Clock,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const LayoutWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);

    const checkWidth = () => {
      if (window.innerWidth < 1440) setShowWarning(true);
      else setShowWarning(false);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  const renderNav = () => {
    if (!user) return null;
    if ('rollNo' in user) {
      return [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/student/dashboard' },
        { icon: <BookOpen size={20} />, label: 'Attendance', path: '/student/attendance' },
        { icon: <Calendar size={20} />, label: 'Timetable', path: '/student/timetable' },
        { icon: <Bell size={20} />, label: 'Announcements', path: '/student/announcements' },
        { icon: <User size={20} />, label: 'Profile', path: '/student/profile' },
      ];
    } else {
      return [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/professor/dashboard' },
        { icon: <Calendar size={20} />, label: 'Master Timetable', path: '/professor/timetable' },
        { icon: <BookOpen size={20} />, label: 'Assignments', path: '/professor/assignments' },
        { icon: <Bell size={20} />, label: 'Announcements', path: '/professor/announcements' },
        { icon: <User size={20} />, label: 'Profile', path: '/professor/profile' },
      ];
    }
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {showWarning && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 text-white">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Laptop Optimized Portal</h2>
            <p className="text-slate-400 mb-6">This ERP system is designed for high-complexity data management and is optimized for screens 1440px or wider.</p>
            <div className="text-sm text-slate-500">Please switch to a laptop or desktop for the best experience.</div>
          </div>
        </div>
      )}

      <aside className={`relative flex flex-col border-r transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'} ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">JECRC</span>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-2 overflow-y-auto">
          {renderNav()?.map((item, idx) => (
            <div key={idx} onClick={() => navigate(item.path)} className="group flex items-center px-3 py-2 cursor-pointer text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200">
              <div className="min-w-[24px]">{item.icon}</div>
              {!isCollapsed && <span className="ml-3 text-sm font-medium transition-opacity duration-200">{item.label}</span>}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={logout} className="flex items-center w-full px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-all duration-200">
            <LogOut size={20} />
            {!isCollapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`h-16 border-b flex items-center justify-between px-8 transition-colors duration-500 ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-center space-x-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Clock size={16} />
            <span className="tabular-nums">{currentTime}</span>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-blue-400 transition-all"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <div className="flex items-center space-x-3 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-medium px-2">{user?.name}</span>
              <img src={user?.profilePic} alt="Profile" className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-600" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
