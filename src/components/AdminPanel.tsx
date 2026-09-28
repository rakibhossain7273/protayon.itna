import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Image as ImageIcon, 
  Database, 
  ShieldCheck, 
  Check, 
  X, 
  Ban, 
  Trash2, 
  Plus, 
  Download, 
  Upload, 
  RefreshCw, 
  Search, 
  AlertTriangle,
  Building2,
  Phone,
  CreditCard,
  MapPin,
  ExternalLink,
  Edit,
  Save,
  CheckCircle2,
  FileArchive
} from 'lucide-react';
import { dbService } from '../services/db';
import { BannerConfig, User } from '../types';

interface AdminPanelProps {
  currentUser: User;
  bannerConfig: BannerConfig;
  onUpdateBannerConfig: (config: BannerConfig) => void;
  onBackToDashboard: () => void;
  onDownloadNetlifyZip: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  bannerConfig,
  onUpdateBannerConfig,
  onBackToDashboard,
  onDownloadNetlifyZip
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'banner' | 'database'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userFilterStatus, setUserFilterStatus] = useState<string>('all');
  
  // Banner config form state
  const [localBanner, setLocalBanner] = useState<BannerConfig>(bannerConfig);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [bannerSaveMsg, setBannerSaveMsg] = useState('');

  // DB export/import message
  const [dbStatusMsg, setDbStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadUsers = () => {
    setUsers(dbService.getUsers());
  };

  useEffect(() => {
    loadUsers();
    const handleDbUpdate = () => loadUsers();
    window.addEventListener('portal_db_updated', handleDbUpdate);
    return () => window.removeEventListener('portal_db_updated', handleDbUpdate);
  }, []);

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchStatus = userFilterStatus === 'all' || u.status === userFilterStatus;
    const q = userSearchQuery.toLowerCase();
    const matchSearch =
      q === '' ||
      u.name.toLowerCase().includes(q) ||
      u.phone.includes(q) ||
      u.nid.includes(q) ||
      u.centerName.toLowerCase().includes(q) ||
      u.union.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const pendingCount = users.filter((u) => u.status === 'pending').length;

  // Actions
  const handleApprove = (userId: string) => {
    dbService.updateUserStatus(userId, 'approved');
    loadUsers();
  };

  const handleReject = (userId: string) => {
    const note = window.prompt('আবেদন বাতিলের কারণ লিখুন (ঐচ্ছিক):') || 'যাচাইয়ে অসম্পূর্ণ তথ্য পাওয়া গেছে';
    dbService.updateUserStatus(userId, 'rejected', note);
    loadUsers();
  };

  const handleBlockToggle = (userId: string, currentStatus: User['status']) => {
    if (currentStatus === 'blocked') {
      dbService.updateUserStatus(userId, 'approved');
    } else {
      const note = window.prompt('অ্যাকাউন্ট বন্ধ করার কারণ লিখুন (ঐচ্ছিক):') || 'অনিয়মের কারণে এডমিন কর্তৃক সাময়িক বন্ধ';
      dbService.updateUserStatus(userId, 'blocked', note);
    }
    loadUsers();
  };

  const handleDeleteUser = (userId: string, name: string) => {
    if (window.confirm(`আপনি কি সত্যিই "${name}" এর অ্যাকাউন্টটি স্থায়ীভাবে মুছে ফেলতে চান?`)) {
      dbService.deleteUser(userId);
      loadUsers();
    }
  };

  // Banner Actions
  const handleAddBannerImage = () => {
    if (!newImageUrl.trim()) return;
    const updated = {
      ...localBanner,
      heroImages: [...(localBanner.heroImages || []), newImageUrl.trim()]
    };
    setLocalBanner(updated);
    setNewImageUrl('');
  };

  const handleFileUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          const updated = {
            ...localBanner,
            heroImages: [...(localBanner.heroImages || []), dataUrl]
          };
          setLocalBanner(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = localBanner.heroImages.filter((_, i) => i !== index);
    setLocalBanner({
      ...localBanner,
      heroImages: updatedImages
    });
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveBannerConfig(localBanner);
    onUpdateBannerConfig(localBanner);
    setBannerSaveMsg('ব্যানার ও সাইট কন্টেন্ট সফলভাবে সেভ করা হয়েছে!');
    setTimeout(() => setBannerSaveMsg(''), 4000);
  };

  // Database Actions
  const handleExportDB = () => {
    const jsonStr = dbService.exportFullDatabase();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `itna_portal_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDbStatusMsg({ type: 'success', text: 'ডাটাবেস সফলভাবে JSON ফাইল আকারে এক্সপোর্ট হয়েছে!' });
  };

  const handleImportDB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = dbService.importFullDatabase(content);
      if (res.success) {
        setDbStatusMsg({ type: 'success', text: res.message });
        loadUsers();
      } else {
        setDbStatusMsg({ type: 'error', text: res.message });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                এডমিন কন্ট্রোল প্যানেল
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              ইউজার অনুমোদন, ব্যানার ছবি পরিবর্তন, অ্যাকাউন্ট নিয়ন্ত্রণ এবং ডাটাবেজ ব্যাকআপ
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDownloadNetlifyZip}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <FileArchive className="w-4 h-4" />
              <span>Netlify ZIP প্যাকেজ ডাউনলোড</span>
            </button>
            <button
              onClick={onBackToDashboard}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              ড্যাশবোর্ডে ফিরুন
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-2xs gap-1">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'users'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ইউজার একাউন্ট ও অনুমোদন</span>
            {pendingCount > 0 && (
              <span className="bg-amber-400 text-slate-950 text-xs px-2 py-0.5 rounded-full font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('banner')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'banner'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>ব্যানার ছবি ও টেক্সট পরিবর্তন</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'database'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>ডাটাবেজ ও Netlify এক্সপোর্ট</span>
          </button>
        </div>

        {/* TAB 1: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Pending Requests Alert */}
            {pendingCount > 0 && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>নতুন {pendingCount}টি রেজিস্ট্রেশন আবেদন অনুমোদনের অপেক্ষায় রয়েছে!</span>
                </div>
                <p className="text-xs text-amber-800 mb-4">
                  উদ্যোক্তাদের তথ্য ও এনআইডি যাচাই করে অনুমোদন (Approve) দিন। অনুমোদন না দেওয়া পর্যন্ত তারা সিস্টেমে লগইন করতে পারবে না।
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {users
                    .filter((u) => u.status === 'pending')
                    .map((pendingUser) => (
                      <div
                        key={pendingUser.id}
                        className="bg-white rounded-xl p-4 border border-amber-200 shadow-2xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-slate-900 text-base">
                                {pendingUser.name}
                              </h4>
                              <p className="text-xs text-emerald-700 font-semibold">
                                {pendingUser.centerName}
                              </p>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              পেন্ডিং
                            </span>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                            <div>
                              <span className="text-slate-400 block">মোবাইল:</span>
                              <span className="font-semibold text-slate-800">{pendingUser.phone}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">ইউনিয়ন:</span>
                              <span className="font-semibold text-slate-800">{pendingUser.union}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">NID:</span>
                              <span className="font-semibold text-slate-800">{pendingUser.nid}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">আবেদনের তারিখ:</span>
                              <span>{new Date(pendingUser.createdAt).toLocaleDateString('bn-BD')}</span>
                            </div>
                          </div>

                          {pendingUser.address && (
                            <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2 rounded">
                              ঠিকানা: {pendingUser.address}
                            </p>
                          )}
                        </div>

                        {/* Approve / Reject Actions */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(pendingUser.id)}
                            className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>অনুমোদন করুন (Approve)</span>
                          </button>
                          <button
                            onClick={() => handleReject(pendingUser.id)}
                            className="py-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold border border-rose-200 transition cursor-pointer"
                          >
                            বাতিল
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* All Registered Users Table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    সকল নিবন্ধিত ব্যবহারকারী তালিকা ({users.length} জন)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    যে কোনো একাউন্ট এক ক্লিকে সাময়িক স্থগিত (বন্ধ) অথবা স্থায়ী ডিলিট করা যাবে
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Status Filter */}
                  <select
                    value={userFilterStatus}
                    onChange={(e) => setUserFilterStatus(e.target.value)}
                    className="text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">সকল স্ট্যাটাস</option>
                    <option value="approved">অনুমোদিত (সক্রিয়)</option>
                    <option value="pending">পেন্ডিং আবেদন</option>
                    <option value="blocked">স্থগিত / বন্ধ</option>
                    <option value="rejected">বাতিলকৃত</option>
                  </select>

                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      placeholder="নাম, ফোন বা ইউনিয়ন..."
                      className="text-xs pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">নাম ও সেন্টার</th>
                      <th className="py-3 px-4">মোবাইল ও ইমেইল</th>
                      <th className="py-3 px-4">ইউনিয়ন ও NID</th>
                      <th className="py-3 px-4">স্ট্যাটাস</th>
                      <th className="py-3 px-4">রোল</th>
                      <th className="py-3 px-4 text-right">নিয়ন্ত্রণ অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredUsers.map((u) => {
                      let statusBadge = (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          সক্রিয়
                        </span>
                      );
                      if (u.status === 'pending') {
                        statusBadge = (
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                            পেন্ডিং
                          </span>
                        );
                      } else if (u.status === 'blocked') {
                        statusBadge = (
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                            স্থগিত (বন্ধ)
                          </span>
                        );
                      } else if (u.status === 'rejected') {
                        statusBadge = (
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">
                            বাতিলকৃত
                          </span>
                        );
                      }

                      return (
                        <tr key={u.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4">
                            <p className="font-bold text-slate-900">{u.name}</p>
                            <p className="text-xs text-slate-500">{u.centerName || 'ব্যক্তিগত'}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-slate-800">{u.phone}</p>
                            <p className="text-[11px] text-slate-400">{u.email || 'নেই'}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-slate-800">{u.union}</p>
                            <p className="text-[11px] text-slate-400 font-mono">NID: {u.nid}</p>
                          </td>
                          <td className="py-3 px-4">{statusBadge}</td>
                          <td className="py-3 px-4">
                            <span className="text-[11px] uppercase font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {u.status === 'pending' && (
                                <button
                                  onClick={() => handleApprove(u.id)}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition"
                                  title="অনুমোদন করুন"
                                >
                                  অনুমোদন
                                </button>
                              )}

                              {u.id !== currentUser.id && (
                                <>
                                  <button
                                    onClick={() => handleBlockToggle(u.id, u.status)}
                                    className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                                      u.status === 'blocked'
                                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300'
                                        : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-300'
                                    }`}
                                    title={u.status === 'blocked' ? 'একাউন্ট পুনরায় চালু করুন' : 'একাউন্ট বন্ধ করুন'}
                                  >
                                    {u.status === 'blocked' ? 'চালু করুন' : 'বন্ধ করুন'}
                                  </button>

                                  <button
                                    onClick={() => handleDeleteUser(u.id, u.name)}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition"
                                    title="মুছে ফেলুন"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    কোন ইউজার পাওয়া যায়নি।
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BANNER & MEDIA MANAGEMENT */}
        {activeTab === 'banner' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                ব্যানার সেকশন এর ছবি ও নোটিশ নিয়ন্ত্রণ
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                এডমিন হিসেবে আপনি হোম পেজের ব্যানার স্লাইডারের ছবি পরিবর্তন, টাইটেল, এবং ঘোষণা নিয়ন্ত্রণ করতে পারবেন।
              </p>
            </div>

            {bannerSaveMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{bannerSaveMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveBanner} className="space-y-6">
              {/* Current Hero Images Preview */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  বর্তমানে সক্রিয় ব্যানার ছবি সমূহ ({localBanner.heroImages?.length || 0} টি):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {localBanner.heroImages?.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="relative rounded-xl overflow-hidden border border-slate-300 shadow-xs h-36 bg-slate-900 group"
                    >
                      <img
                        src={imgUrl}
                        alt={`Slide ${i + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="p-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 text-xs font-bold transition flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>মুছে ফেলুন</span>
                        </button>
                      </div>
                      <span className="absolute bottom-1 left-2 text-[10px] text-white bg-black/60 px-1.5 py-0.5 rounded font-mono">
                        স্লাইড #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add New Image Controls */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <p className="text-xs font-bold text-slate-700">
                    + নতুন ব্যানার ছবি যুক্ত করুন (URL অথবা কম্পিউটার থেকে আপলোড):
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="ছবির সরাসরি লিঙ্ক (https://...)"
                      className="flex-1 px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddBannerImage}
                      className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition"
                    >
                      URL যোগ করুন
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <label className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg text-xs font-bold cursor-pointer hover:bg-slate-100 transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>কম্পিউটার থেকে ছবি আপলোড করুন</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUploadImage}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-400">
                      (JPG, PNG, WebP সাপোর্টেড)
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ব্যানার শিরোনাম (Title):
                  </label>
                  <input
                    type="text"
                    value={localBanner.heroTitle}
                    onChange={(e) => setLocalBanner({ ...localBanner, heroTitle: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ব্যানার সাব-শিরোনাম (Subtitle):
                  </label>
                  <textarea
                    rows={2}
                    value={localBanner.heroSubtitle}
                    onChange={(e) => setLocalBanner({ ...localBanner, heroSubtitle: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    স্ক্রলিং নোটিশ বার (Ticker):
                  </label>
                  <input
                    type="text"
                    value={localBanner.noticeTicker}
                    onChange={(e) => setLocalBanner({ ...localBanner, noticeTicker: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>পরিবর্তন সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: DATABASE & NETLIFY DEPLOYMENT */}
        {activeTab === 'database' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                ডাটাবেজ ব্যবস্থাপনা ও Netlify ডিপ্লয়মেন্ট
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                আপনার সিস্টেমের সকল ইউজার, ক্যাশবুকের রেকর্ড ও ব্যাকআপ ফাইল এবং Netlify-তে আপলোড উপযোগী জিপ (ZIP) প্যাকেজ তৈরি করুন।
              </p>
            </div>

            {dbStatusMsg && (
              <div
                className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 ${
                  dbStatusMsg.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                    : 'bg-rose-50 border border-rose-300 text-rose-800'
                }`}
              >
                {dbStatusMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                )}
                <span>{dbStatusMsg.text}</span>
              </div>
            )}

            {/* Netlify 1-Click ZIP Box */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Netlify Ready Package
                  </span>
                  <h4 className="text-lg font-bold text-emerald-950 mt-2">
                    📦 সম্পূর্ণ প্রজেক্টটি Netlify জিপ (ZIP) আকারে ডাউনলোড করুন
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    এই জিপ ফাইলটিতে আপনার সমস্ত ২২টি প্রত্যয়নপত্র টুল, ইউজার সিস্টেম, ব্যানার কনফিগ, এবং Netlify কনফিগারেশন এক সাথে প্যাকেজ করা আছে।
                    ফাইলটি ডাউনলোড করে আনজিপ করুন এবং <strong>app.netlify.com/drop</strong> এ আপলোড করে দিন!
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={onDownloadNetlifyZip}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Netlify প্যাকেজ (.ZIP) ডাউনলোড করুন</span>
                </button>
              </div>
            </div>

            {/* Backup & Restore Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              {/* Export JSON */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-800">
                    📥 ডাটাবেজ ব্যাকআপ (JSON)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    ইউজার তথ্য, ব্যানার সেটিংস ও ক্যাশবুক হিস্ট্রি সহ সম্পূর্ণ ডাটাবেজ ডাউনলোড করুন।
                  </p>
                </div>
                <button
                  onClick={handleExportDB}
                  className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>JSON ব্যাকআপ ডাউনলোড</span>
                </button>
              </div>

              {/* Import JSON */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-800">
                    📤 ডাটাবেজ রিস্টোর (JSON)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    পূর্বে ডাউনলোড করা ব্যাকআপ JSON ফাইল সিলেক্ট করে ডাটা রিকভার করুন।
                  </p>
                </div>
                <label className="mt-4 px-4 py-2 bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>ব্যাকআপ ফাইল আপলোড করুন</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportDB}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
