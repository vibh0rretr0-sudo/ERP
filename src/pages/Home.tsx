import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

const CAMPUS_IMAGES = [
  '/assets/campus1.avif',
  '/assets/campus2.avif',
  '/assets/campus3.avif',
];

export const Home: React.FC = () => {
  const [role, setRole] = useState<'STUDENT' | 'PROFESSOR' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAMPUS_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    // Mock login success
    login(role, {});
    if (role === 'STUDENT') navigate('/student/dashboard');
    else navigate('/professor/dashboard');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans">
      {/* Background Carousel with Cross-fade */}
      <div className="absolute inset-0 z-0">
        {CAMPUS_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={img}
              alt={`JECRC Campus ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-4xl flex gap-12 items-center text-white">

          {/* Left side: Branding & Info */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight mb-2">
                JECRC <span className="text-blue-400">Portal</span>
              </h1>
              <p className="text-slate-200 text-lg">
                Unified Educational Resource Planning system for excellence in academics and administration.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-blue-400 mb-2"><GraduationCap size={24} /></div>
                <div className="text-sm font-semibold">Student Hub</div>
                <div className="text-xs text-slate-400">Attendance & Learning</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-blue-400 mb-2"><ShieldCheck size={24} /></div>
                <div className="text-sm font-semibold">Faculty Portal</div>
                <div className="text-xs text-slate-400">Management & Grading</div>
              </div>
            </div>
          </div>

          {/* Right side: Dynamic Login Card */}
          <div className="w-[400px] bg-white rounded-2xl p-8 text-slate-900 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-slate-500 text-sm">Please select your role to continue</p>
            </div>

            {/* Role Selection */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
              <button
                onClick={() => setRole('STUDENT')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  role === 'STUDENT' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole('PROFESSOR')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  role === 'PROFESSOR' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Professor
              </button>
            </div>

            {/* Transitioning Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {role === 'PROFESSOR' ? 'Username' : role === 'STUDENT' ? 'Roll Number' : 'Identify Yourself'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    placeholder={role === 'PROFESSOR' ? "e.g. prof_smith" : role === 'STUDENT' ? "e.g. 2021CS101" : "Select role first..."}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    disabled={!role}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2 2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
                  <input
                    required
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    disabled={!role}
                  />
                </div>
              </div>

              <button
                disabled={!role}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                Sign In
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-all" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
