import React from 'react';
import { ITNA_UNIONS } from '../data/unionsData';
import { Building, MapPin, UserCheck, Shield } from 'lucide-react';

export const UnionShowcase: React.FC = () => {
  return (
    <section className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2 border border-emerald-200">
            <Building className="w-3.5 h-3.5" />
            <span>ইটনা উপজেলার ইউনিয়ন পরিষদ সমূহ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ৯টি ইউনিয়ন পরিষদের ডিজিটাল সেবা নেটওয়ার্ক
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            প্রতিটি ইউনিয়ন পরিষদের নিজস্ব সিল ও অফিশিয়াল চেয়ারম্যানের তথ্যাদি সিস্টেমে প্রি-কনফিগার করা আছে।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITNA_UNIONS.map((union) => (
            <div
              key={union.id}
              className="bg-slate-50 hover:bg-emerald-50/50 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition duration-200 flex items-start gap-3.5"
            >
              <div className="w-14 h-14 rounded-lg bg-white p-1 border border-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                <img
                  src={union.logo}
                  alt={union.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to BD seal if image doesn't load
                    (e.target as HTMLImageElement).src =
                      'https://upload.wikimedia.org/wikipedia/commons/8/84/Government_Seal_of_Bangladesh.svg';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-slate-900 truncate">
                  {union.name}
                </h4>
                <p className="text-xs text-slate-400 font-mono truncate">
                  {union.englishName}
                </p>

                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold truncate">চেয়ারম্যান: {union.chairman}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>ডাকঘর: {union.postOffice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
