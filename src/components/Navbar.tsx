import React from 'react';
import { 
  Building2, 
  LogIn, 
  UserPlus, 
  LogOut, 
  ShieldCheck, 
  LayoutDashboard, 
  Home, 
  PhoneCall, 
  Download,
  Menu,
  X
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  currentView: 'home' | 'dashboard' | 'admin' | 'tool';
  onNavigate: (view: 'home' | 'dashboard' | 'admin') => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  onDownloadNetlifyZip: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  onNavigate,
  onOpenAuth,
  onLogout,
  onDownloadNetlifyZip
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top emergency / hotline banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
            </span>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:inline text-emerald-100">ইটনা উপজেলা পরিষদ, কিশোরগঞ্জ</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100">
            <span className="hidden sm:inline flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-emerald-300" />
              হেল্পলাইন: ৩৩৩ / ৯৯৯
            </span>
            <button 
              onClick={onDownloadNetlifyZip}
              className="inline-flex items-center gap-1 bg-emerald-700/80 hover:bg-emerald-600 text-white px-2.5 py-0.5 rounded text-[11px] font-semibold transition"
              title="Netlify হোস্ট করার জন্য জিপ প্যাকেজ ডাউনলোড করুন"
            >
              <Download className="w-3 h-3" />
              Netlify ZIP ডাউনলোড
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo & Portal Brand */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 flex-shrink-0 bg-emerald-50 rounded-xl p-1 border border-emerald-200 group-hover:shadow-md transition">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_Seal_of_Bangladesh.svg" 
                alt="Govt Seal" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl text-emerald-950 tracking-tight leading-tight">
                  ইটনা ডিজিটাল সেন্টার
                </span>
                <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-300">
                  উপজেলা পোর্টাল
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                প্রত্যয়নপত্র, ট্রেড লাইসেন্স ও অনলাইন সেবা ব্যবস্থাপনা
              </p>
            </div>
          </div>

          {/* Desktop Nav Links & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
                currentView === 'home' 
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200' 
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4" />
              হোম পেজ
            </button>

            {currentUser ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
                    currentView === 'dashboard' 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  ড্যাশবোর্ড
                </button>

                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
                      currentView === 'admin' 
                        ? 'bg-amber-600 text-white shadow-sm' 
                        : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    এডমিন প্যানেল
                  </button>
                )}

                {/* User Dropdown / Badge */}
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200 ml-2">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-800 leading-none">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-medium">
                      {currentUser.union} {currentUser.role === 'admin' && '• এডমিন'}
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="লগআউট"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg border border-emerald-300 transition flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  লগইন
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow transition flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  নতুন একাউন্ট রেজিস্ট্রেশন
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {currentUser && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="p-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                ড্যাশবোর্ড
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-emerald-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            হোম পেজ
          </button>

          {currentUser ? (
            <>
              <button
                onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-emerald-700 bg-emerald-50 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                ড্যাশবোর্ড ও সকল সার্ভিস (২২+)
              </button>

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-amber-800 bg-amber-50 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  এডমিন প্যানেল (ইউজার ও ব্যানার ম্যানেজমেন্ট)
                </button>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500">{currentUser.centerName}</p>
                </div>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="px-3 py-1.5 text-xs text-rose-600 bg-rose-50 rounded-md font-semibold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  লগআউট
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-300 rounded-lg"
              >
                লগইন
              </button>
              <button
                onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-emerald-600 rounded-lg"
              >
                রেজিস্ট্রেশন
              </button>
            </div>
          )}

          <button
            onClick={() => { onDownloadNetlifyZip(); setMobileMenuOpen(false); }}
            className="w-full py-2 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            Netlify Deployment ZIP ডাউনলোড
          </button>
        </div>
      )}
    </header>
  );
};
