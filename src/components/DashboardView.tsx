import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  ExternalLink, 
  Play, 
  User as UserIcon, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  History, 
  FileText,
  Clock,
  Printer,
  ChevronRight
} from 'lucide-react';
import { ToolItem, User } from '../types';
import { TOOLS_DATA } from '../data/toolsData';

interface DashboardViewProps {
  currentUser: User;
  onSelectTool: (tool: ToolItem) => void;
  onGoToAdmin?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  onSelectTool,
  onGoToAdmin
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'সকল সেবা (২২টি)' },
    { id: 'certificate', name: 'নাগরিক ও প্রত্যয়ন' },
    { id: 'family', name: 'পারিবারিক ও ওয়ারিশান' },
    { id: 'trade', name: 'ট্রেড লাইসেন্স' },
    { id: 'voter', name: 'ভোটার ও নির্বাচন' },
    { id: 'agri', name: 'কৃষি ও স্বাস্থ্য' },
    { id: 'cashbook', name: 'হিসাব ও খাতা' },
    { id: 'other', name: 'অন্যান্য' },
  ];

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchCat = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchQuery = 
        searchQuery === '' ||
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Featured quick access tools
  const quickTools = useMemo(() => {
    return TOOLS_DATA.filter((t) => t.featured).slice(0, 6);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* User Profile Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-700/50">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-2xl flex-shrink-0 backdrop-blur-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    স্বাগতম, {currentUser.name}!
                  </h1>
                  <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    সক্রিয় উদ্যোক্তা
                  </span>
                  {currentUser.role === 'admin' && (
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                      এডমিন প্রিভিলেজ
                    </span>
                  )}
                </div>
                <p className="text-emerald-100 text-sm mt-1 flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-emerald-300" />
                    {currentUser.centerName}
                  </span>
                  <span>•</span>
                  <span>{currentUser.union}</span>
                  <span>•</span>
                  <span>মোবাইল: {currentUser.phone}</span>
                </p>
              </div>
            </div>

            {/* Quick Action Button */}
            {currentUser.role === 'admin' && onGoToAdmin && (
              <button
                onClick={onGoToAdmin}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-md flex items-center gap-2 self-start md:self-auto cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>এডমিন ড্যাশবোর্ড খুলুন</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Launch Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>জনপ্রিয় সেবা দ্রুত শুরু করুন</span>
            </h3>
            <span className="text-xs text-slate-500">১ ক্লিকে ফরম পূরণ ও প্রিন্ট</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className="bg-white hover:bg-emerald-50 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-sm transition text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-3 group-hover:scale-110 transition">
                  <Play className="w-4 h-4 fill-emerald-800" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 line-clamp-2">
                    {tool.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                    {tool.categoryBangla}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* All Tools Directory with Search */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                সকল অনলাইন প্রত্যয়ন ও সেবা ডিরেক্টরি
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                আপনার প্রয়োজনীয় ফর্মটি নির্বাচন করুন এবং প্রয়োজনীয় তথ্য ইনপুট দিয়ে প্রিন্ট প্যাড তৈরি করুন
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="সেবা খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition bg-white flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {tool.categoryBangla}
                    </span>
                    {tool.badge && (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 text-base leading-snug">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {tool.englishTitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectTool(tool)}
                    className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>ওপেন করুন</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={tool.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-slate-200 transition"
                    title="নতুন উইন্ডোতে খুলুন"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">
              কোন সেবা পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
