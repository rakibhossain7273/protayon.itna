import React from 'react';
import { PhoneCall, Mail, MapPin, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_Seal_of_Bangladesh.svg" 
                alt="Govt Seal" 
                className="w-8 h-8 object-contain"
              />
              <span className="font-bold text-white text-sm">
                ইটনা ডিজিটাল সেন্টার ও প্রত্যয়ন পোর্টাল
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              কিশোরগঞ্জ জেলার ইটনা উপজেলার ৯টি ইউনিয়নের নাগরিকদের জন্য অনলাইন প্রত্যয়নপত্র, ট্রেড লাইসেন্স ও ডিজিটাল সেন্টারের কেন্দ্রীয় ম্যানেজমেন্ট পোর্টাল।
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              জনপ্রিয় ডিজিটাল সেবা
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• আয় বিবরণী প্রত্যয়নপত্র</li>
              <li>• ডিজিটাল নাগরিক ও চারিত্রিক সনদ</li>
              <li>• ওয়ারিশন ও পারিবারিক সনদ</li>
              <li>• ট্রেড লাইসেন্স (মডেল কর তফসিল ২০১৩)</li>
              <li>• নতুন ভোটার ও এলাকা স্থানান্তর প্রত্যয়ন</li>
              <li>• ডিজিটাল সেন্টার বাকির খাতা ও OCR স্ক্যান</li>
            </ul>
          </div>

          {/* Col 3: Unions */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              ইউনিয়ন পরিষদ সমূহ
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              রায়টুটী, ধনপুর, মৃগা, ইটনা সদর, বড়িবাড়ি, বাদলা, এলংজুরী, জয়সিদ্ধি ও চৌগাংগা ইউনিয়ন পরিষদ।
            </p>
            <div className="mt-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-emerald-400 font-medium">
              ✓ প্রতিটি ইউনিয়নের চেয়ারম্যান ও পোস্টাল কোড ডেটাবেজে সংযুক্ত রয়েছে।
            </div>
          </div>

          {/* Col 4: Contact & Emergency */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              যোগাযোগ ও জরুরি সেবা
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>উপজেলা পরিষদ কমপ্লেক্স, ইটনা, কিশোরগঞ্জ</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>জাতীয় জরুরি সেবা: ৯৯৯</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>সরকারি তথ্য ও সেবা: ৩৩৩</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>ইমেইল: admin@itna.gov.bd</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} ইটনা উপজেলা প্রশাসন ও ইউনিয়ন পরিষদ ডিজিটাল সেন্টার নেটওয়ার্ক। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            <span>স্মার্ট বাংলাদেশ বিনির্মাণে জনগণের দোরগোড়ায় সেবা</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
