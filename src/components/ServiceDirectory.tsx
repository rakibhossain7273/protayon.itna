import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  Sparkles, 
  FileText, 
  Users, 
  Store, 
  Vote, 
  Tractor, 
  Calculator, 
  Layers, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { ToolItem, User } from '../types';
import { TOOLS_DATA } from '../data/toolsData';

interface ServiceDirectoryProps {
  currentUser: User | null;
  onSelectTool: (tool: ToolItem) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const ServiceDirectory: React.FC<ServiceDirectoryProps> = ({
  currentUser,
  onSelectTool,
  onOpenAuth
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'সকল সেবা (২২টি)', icon: Layers },
    { id: 'certificate', name: 'নাগরিক ও প্রত্যয়ন', icon: FileText },
    { id: 'family', name: 'পারিবারিক ও ওয়ারিশান', icon: Users },
    { id: 'trade', name: 'ট্রেড লাইসেন্স ও ব্যবসা', icon: Store },
    { id: 'voter', name: 'নির্বাচন ও ভোটার', icon: Vote },
    { id: 'agri', name: 'কৃষি ও জনস্বাস্থ্য', icon: Tractor },
    { id: 'cashbook', name: 'হিসাব ও অটোমেশন', icon: Calculator },
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

  const handleToolClick = (tool: ToolItem) => {
    if (!currentUser) {
      onOpenAuth('login');
      return;
    }
    onSelectTool(tool);
  };

  return (
    <section id="services-section" className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ইটনা উপজেলার সকল ইউনিয়নের সেবা সমূহ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            অনলাইন প্রত্যয়নপত্র ও সার্ভিস ডিরেক্টরি
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            আপনার প্রয়োজনীয় প্রত্যয়নপত্র বা লাইসেন্স নির্বাচন করুন। ডিজিটাল সেন্টারের উদ্যোক্তারা অনুমোদিত একাউন্টে লগইন করে সকল জেনারেটরে দ্রুত এন্ট্রি ও প্রিন্ট করতে পারবেন।
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="space-y-4 mb-8">
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সার্ভিসের নাম দিয়ে খুঁজুন (যেমন: ওয়ারিশান, ট্রেড লাইসেন্স, নাগরিক সনদ, ভোটার...)"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl shadow-xs text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1 bg-slate-100 rounded"
              >
                ক্লিয়ার
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Guest alert if not logged in */}
        {!currentUser && (
          <div className="max-w-4xl mx-auto mb-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-amber-900 font-medium">
                টুলগুলোতে তথ্য এন্ট্রি ও এডিটের জন্য আপনার উদ্যোক্তা একাউন্টে <strong>লগইন</strong> প্রয়োজন। একাউন্ট না থাকলে এখনই আবেদন করুন।
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition"
              >
                লগইন করুন
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-3.5 py-1.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-bold transition"
              >
                রেজিস্ট্রেশন
              </button>
            </div>
          </div>
        )}

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-emerald-300"
            >
              <div className="p-5">
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {tool.categoryBangla}
                  </span>
                  {tool.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {tool.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {tool.englishTitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Card Footer / Action */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleToolClick(tool)}
                  className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>{currentUser ? 'জেনারেটর ওপেন করুন' : 'লগইন করে ব্যবহার করুন'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={tool.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-slate-200 bg-white transition"
                  title="নতুন উইন্ডোতে ওপেন করুন"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-700">কোন সেবা পাওয়া যায়নি</p>
            <p className="text-xs text-slate-500 mt-1">ভিন্ন কীওয়ার্ড দিয়ে পুনরায় খুঁজুন অথবা ক্যাটাগরি রিসেট করুন।</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
            >
              সকল সেবা দেখুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
