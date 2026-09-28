import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldAlert, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  Lock, 
  User as UserIcon, 
  Building2, 
  CreditCard, 
  MapPin, 
  Sparkles,
  Info
} from 'lucide-react';
import { ITNA_UNIONS } from '../data/unionsData';
import { dbService } from '../services/db';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regFatherName, setRegFatherName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regNid, setRegNid] = useState('');
  const [regUnion, setRegUnion] = useState(ITNA_UNIONS[3].name); // default 4নং ইটনা
  const [regCenterName, setRegCenterName] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState('');
  const [registerError, setRegisterError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setLoginError('দয়া করে মোবাইল নম্বর/ইমেইল এবং পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    const res = dbService.login(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.message);
      return;
    }

    if (res.user) {
      onSuccess(res.user);
      onClose();
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccessMsg('');

    // Validations
    if (!regName.trim() || !regPhone.trim() || !regNid.trim() || !regCenterName.trim()) {
      setRegisterError('দয়া করে তারকাচিহ্নিত (*) সকল তথ্য সঠিকভাবে পূরণ করুন।');
      return;
    }

    if (regPassword.length < 6) {
      setRegisterError('পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে।');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegisterError('উভয় পাসওয়ার্ড হুবহু মেলেনি!');
      return;
    }

    const res = dbService.registerUser({
      name: regName.trim(),
      fatherName: regFatherName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim(),
      nid: regNid.trim(),
      union: regUnion,
      centerName: regCenterName.trim(),
      address: regAddress.trim(),
      password: regPassword
    });

    if (!res.success) {
      setRegisterError(res.message);
      return;
    }

    setRegisterSuccessMsg(res.message);
  };

  const handleQuickDemoFill = (type: 'admin' | 'user' | 'pending' | 'blocked') => {
    setMode('login');
    setLoginError('');
    if (type === 'admin') {
      setLoginIdentifier('01700000000');
      setLoginPassword('admin123');
    } else if (type === 'user') {
      setLoginIdentifier('01711223344');
      setLoginPassword('user123');
    } else if (type === 'pending') {
      setLoginIdentifier('01899112233');
      setLoginPassword('user123');
    } else if (type === 'blocked') {
      setLoginIdentifier('01911998877');
      setLoginPassword('user123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex justify-between items-center relative">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-300" />
              <span>{mode === 'login' ? 'উদ্যোক্তা ও এডমিন লগইন' : 'নতুন উদ্যোক্তা রেজিস্ট্রেশন'}</span>
            </h3>
            <p className="text-xs text-emerald-100 mt-1">
              ইটনা উপজেলা ডিজিটাল সেন্টার ও ইউনিয়ন পরিষদ পোর্টাল
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => { setMode('login'); setLoginError(''); setRegisterError(''); }}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition ${
              mode === 'login'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            লগইন করুন
          </button>
          <button
            onClick={() => { setMode('register'); setLoginError(''); setRegisterError(''); }}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition ${
              mode === 'register'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            নতুন অ্যাকাউন্ট আবেদন
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>{loginError}</div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  মোবাইল নম্বর অথবা ইমেইল: <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="যেমন: 01711223344 অথবা admin@itna.gov.bd"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  পাসওয়ার্ড: <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="আপনার গোপন পাসওয়ার্ড দিন"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                লগইন করুন
              </button>

              {/* Quick Fill Testing Helper */}
              <div className="pt-4 border-t border-slate-200 mt-6">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>পরীক্ষামূলক ডেমো লগইন বাটন (এক ক্লিকে পূর্ণ করুন):</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('admin')}
                    className="p-2 text-left rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition"
                  >
                    <span className="font-bold block text-[11px]">এডমিন অ্যাকাউন্ট</span>
                    <span className="text-[10px] text-amber-700">01700000000 / admin123</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('user')}
                    className="p-2 text-left rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition"
                  >
                    <span className="font-bold block text-[11px]">অনুমোদিত উদ্যোক্তা</span>
                    <span className="text-[10px] text-emerald-700">01711223344 / user123</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('pending')}
                    className="p-2 text-left rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 transition"
                  >
                    <span className="font-bold block text-[11px]">পেন্ডিং একাউন্ট টেস্ট</span>
                    <span className="text-[10px] text-blue-700">অনুমোদনের অপেক্ষায়</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('blocked')}
                    className="p-2 text-left rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 transition"
                  >
                    <span className="font-bold block text-[11px]">ব্লকড একাউন্ট টেস্ট</span>
                    <span className="text-[10px] text-rose-700">সাময়িক স্থগিত</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {registerSuccessMsg ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm">
                  <div className="flex items-center gap-2 font-bold text-base text-emerald-800 mb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    আবেদন সফলভাবে গৃহীত হয়েছে!
                  </div>
                  <p className="leading-relaxed text-xs sm:text-sm">
                    {registerSuccessMsg}
                  </p>
                  <div className="mt-4 pt-3 border-t border-emerald-200 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setLoginIdentifier(regPhone);
                        setLoginPassword(regPassword);
                        setRegisterSuccessMsg('');
                      }}
                      className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition"
                    >
                      লগইন পেজে যান
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p>
                      রেজিস্ট্রেশন সম্পন্ন হলে আপনার আবেদনটি <strong>এডমিনের অনুমোদনের তালিকায়</strong> জমা হবে। এডমিন অনুমোদন দেওয়া মাত্র আপনার একাউন্ট সক্রিয় হয়ে যাবে।
                    </p>
                  </div>

                  {registerError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>{registerError}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        উদ্যোক্তার নাম: <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="আপনার পূর্ণ নাম"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        পিতার নাম:
                      </label>
                      <input
                        type="text"
                        value={regFatherName}
                        onChange={(e) => setRegFatherName(e.target.value)}
                        placeholder="পিতার নাম"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        মোবাইল নম্বর (লগইন আইডি): <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="০১XXXXXXXXX"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ইমেইল এড্রেস (ঐচ্ছিক):
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="example@mail.com"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        জাতীয় পরিচয়পত্র নং (NID): <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={regNid}
                        onChange={(e) => setRegNid(e.target.value)}
                        placeholder="১০/১৩/১৭ ডিজিট এনআইডি"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ইউনিয়ন পরিষদ: <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={regUnion}
                        onChange={(e) => setRegUnion(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      >
                        {ITNA_UNIONS.map((u) => (
                          <option key={u.id} value={u.name}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ডিজিটাল সেন্টার / ব্যবসা প্রতিষ্ঠানের নাম: <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={regCenterName}
                      onChange={(e) => setRegCenterName(e.target.value)}
                      placeholder="যেমন: ইটনা ডিজিটাল কর্নার ও কম্পিউটার্স"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      দোকান / সেন্টারের পূর্ণ ঠিকানা (গ্রাম, বাজার, ওয়ার্ড):
                    </label>
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="যেমন: পুরাতন বাজার, ৩নং ওয়ার্ড, ইটনা"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        পাসওয়ার্ড দিন: <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="কমপক্ষে ৬ অক্ষর"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        পাসওয়ার্ড নিশ্চিত করুন: <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm text-sm transition flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    রেজিস্ট্রেশন আবেদন জমা দিন
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
