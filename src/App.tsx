import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ServiceDirectory } from './components/ServiceDirectory';
import { UnionShowcase } from './components/UnionShowcase';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { AdminPanel } from './components/AdminPanel';
import { ToolViewer } from './components/ToolViewer';
import { Footer } from './components/Footer';
import { dbService } from './services/db';
import { BannerConfig, ToolItem, User } from './types';
import { Loader2, Download, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'admin' | 'tool'>('home');
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Banner config state
  const [bannerConfig, setBannerConfig] = useState<BannerConfig>(dbService.getBannerConfig());

  // ZIP packaging state
  const [isPackagingZip, setIsPackagingZip] = useState(false);
  const [zipProgressStatus, setZipProgressStatus] = useState('');
  const [zipPercent, setZipPercent] = useState(0);
  const [zipSuccessAlert, setZipSuccessAlert] = useState(false);

  // Initial authentication & configuration load
  useEffect(() => {
    const user = dbService.getCurrentUser();
    setCurrentUser(user);
    setBannerConfig(dbService.getBannerConfig());

    const handleAuthChange = () => {
      const updated = dbService.getCurrentUser();
      setCurrentUser(updated);
      if (!updated && (currentView === 'dashboard' || currentView === 'admin')) {
        setCurrentView('home');
      }
    };

    const handleBannerChange = () => {
      setBannerConfig(dbService.getBannerConfig());
    };

    window.addEventListener('portal_auth_changed', handleAuthChange);
    window.addEventListener('portal_banner_updated', handleBannerChange);

    return () => {
      window.removeEventListener('portal_auth_changed', handleAuthChange);
      window.removeEventListener('portal_banner_updated', handleBannerChange);
    };
  }, [currentView]);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    dbService.logout();
    setCurrentUser(null);
    setCurrentView('home');
    setSelectedTool(null);
  };

  const handleSelectTool = (tool: ToolItem) => {
    setSelectedTool(tool);
    setCurrentView('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadNetlifyZip = async () => {
    try {
      setIsPackagingZip(true);
      setZipPercent(5);
      setZipProgressStatus('Netlify প্যাকেজ প্রস্তুত করা হচ্ছে...');

      const zipBlob = await dbService.generateNetlifyZip((percent, status) => {
        setZipPercent(percent);
        setZipProgressStatus(status);
      });

      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `itna_digital_center_netlify_${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setIsPackagingZip(false);
      setZipSuccessAlert(true);
      setTimeout(() => setZipSuccessAlert(false), 6000);
    } catch (err) {
      console.error(err);
      setIsPackagingZip(false);
      alert('জিপ ফাইল তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={(view) => {
          setSelectedTool(null);
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onDownloadNetlifyZip={handleDownloadNetlifyZip}
      />

      {/* Netlify ZIP Success Toast */}
      {zipSuccessAlert && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-800 text-white px-5 py-4 rounded-2xl shadow-2xl border border-emerald-600 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-6 h-6 text-emerald-300 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Netlify ZIP প্যাকেজ ডাউনলোড সম্পন্ন!</h4>
            <p className="text-xs text-emerald-100">
              ফাইলটি আনজিপ করে সরাসরি app.netlify.com/drop এ আপলোড করলেই সাইট লাইভ হয়ে যাবে।
            </p>
          </div>
        </div>
      )}

      {/* ZIP Packaging Modal Indicator */}
      {isPackagingZip && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-slate-200">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-3" />
            <h3 className="font-bold text-base text-slate-900">
              Netlify প্যাকেজ তৈরি হচ্ছে...
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              {zipProgressStatus} ({zipPercent}%)
            </p>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${zipPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroBanner
              bannerConfig={bannerConfig}
              onExploreServices={scrollToServices}
              onOpenRegister={() => handleOpenAuth('register')}
              isLoggedIn={!!currentUser}
              onGoToDashboard={() => setCurrentView('dashboard')}
            />
            <ServiceDirectory
              currentUser={currentUser}
              onSelectTool={handleSelectTool}
              onOpenAuth={handleOpenAuth}
            />
            <UnionShowcase />
          </>
        )}

        {currentView === 'dashboard' && currentUser && (
          <DashboardView
            currentUser={currentUser}
            onSelectTool={handleSelectTool}
            onGoToAdmin={currentUser.role === 'admin' ? () => setCurrentView('admin') : undefined}
          />
        )}

        {currentView === 'admin' && currentUser && currentUser.role === 'admin' && (
          <AdminPanel
            currentUser={currentUser}
            bannerConfig={bannerConfig}
            onUpdateBannerConfig={(updated) => setBannerConfig(updated)}
            onBackToDashboard={() => setCurrentView('dashboard')}
            onDownloadNetlifyZip={handleDownloadNetlifyZip}
          />
        )}

        {currentView === 'tool' && selectedTool && (
          <ToolViewer
            tool={selectedTool}
            onBack={() => {
              setSelectedTool(null);
              setCurrentView(currentUser ? 'dashboard' : 'home');
            }}
          />
        )}
      </main>

      {/* Global Footer (shown on all pages except full tool runner) */}
      {currentView !== 'tool' && <Footer />}

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
