import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Shield, ArrowRight, CheckCircle2, Megaphone } from 'lucide-react';
import { BannerConfig } from '../types';

interface HeroBannerProps {
  bannerConfig: BannerConfig;
  onExploreServices: () => void;
  onOpenRegister: () => void;
  isLoggedIn: boolean;
  onGoToDashboard: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  bannerConfig,
  onExploreServices,
  onOpenRegister,
  isLoggedIn,
  onGoToDashboard
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = bannerConfig.heroImages && bannerConfig.heroImages.length > 0 
    ? bannerConfig.heroImages 
    : [
        'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop'
      ];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white">
      {/* Announcement Marquee Ticker */}
      {bannerConfig.noticeTicker && (
        <div className="bg-amber-500 text-slate-950 font-semibold text-xs sm:text-sm py-2 px-4 shadow-sm flex items-center">
          <div className="flex items-center gap-1.5 flex-shrink-0 bg-amber-600/30 px-2 py-0.5 rounded font-bold mr-3 uppercase tracking-wider text-[11px]">
            <Megaphone className="w-3.5 h-3.5" />
            জরুরি ঘোষণা
          </div>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="inline-block animate-marquee pl-full">
              {bannerConfig.noticeTicker}
            </div>
          </div>
        </div>
      )}

      {/* Main Banner Slider Area */}
      <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center">
        {/* Background Image Carousel */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={img}
              alt={`Banner slide ${idx + 1}`}
              className="w-full h-full object-cover object-center filter brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-900/80 to-transparent"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{bannerConfig.welcomeNote || 'স্মার্ট বাংলাদেশ • স্মার্ট ইউনিয়ন পরিষদ'}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-md">
              {bannerConfig.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-8 max-w-2xl drop-shadow-xs">
              {bannerConfig.heroSubtitle}
            </p>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-emerald-100 mb-8 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>৯টি ইউনিয়নের চেয়ারম্যান অনুমোদিত অফিশিয়াল ফরম্যাট</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>আয়, ওয়ারিশান, নাগরিক ও পারিবারিক প্রত্যয়ন জেনারেটর</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>ট্রেড লাইসেন্স ও ডিজিটাল সেন্টার অটো OCR ক্যাশবুক</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>ইউজার একাউন্ট ও নিরাপদ এডমিন অনুমোদন নিয়ন্ত্রণ</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {isLoggedIn ? (
                <button
                  onClick={onGoToDashboard}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg hover:shadow-emerald-500/30 transition flex items-center gap-2"
                >
                  <span>সরাসরি ড্যাশবোর্ডে প্রবেশ করুন</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <>
                  <button
                    onClick={onOpenRegister}
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg hover:shadow-emerald-500/30 transition flex items-center gap-2"
                  >
                    <span>উদ্যোক্তা অ্যাকাউন্ট খুলুন</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onExploreServices}
                    className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 backdrop-blur-md transition"
                  >
                    সেবা তালিকা দেখুন
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-emerald-400' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick Statistics Bar */}
      <div className="bg-emerald-950 border-t border-emerald-800/60 py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-emerald-800/40">
          <div className="px-2">
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">০৯</p>
            <p className="text-xs text-slate-300 font-medium">ইউনিয়ন পরিষদ সেবা</p>
          </div>
          <div className="px-2">
            <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">২২+</p>
            <p className="text-xs text-slate-300 font-medium">অনলাইন প্রত্যয়ন ও টুলস</p>
          </div>
          <div className="px-2">
            <p className="text-2xl sm:text-3xl font-black text-teal-400 font-mono">১০০%</p>
            <p className="text-xs text-slate-300 font-medium">সঠিক ও ডিজিটাল প্রিন্ট ফরম্যাট</p>
          </div>
          <div className="px-2">
            <p className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">২৪/৭</p>
            <p className="text-xs text-slate-300 font-medium">ক্লাউড ও অফলাইন ব্যাকআপ</p>
          </div>
        </div>
      </div>
    </div>
  );
};
