import React, { useRef } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  RotateCw, 
  Printer, 
  Sparkles, 
  Maximize2,
  FileCheck2
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolViewerProps {
  tool: ToolItem;
  onBack: () => void;
}

export const ToolViewer: React.FC<ToolViewerProps> = ({ tool, onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = tool.file;
    }
  };

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      {/* Top Action Toolbar */}
      <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold transition shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ড্যাশবোর্ডে ফিরুন</span>
          </button>

          <div className="border-l border-slate-700 pl-3">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm sm:text-base text-white truncate max-w-[280px] sm:max-w-md">
                {tool.title}
              </h2>
              <span className="hidden sm:inline-block bg-emerald-950 text-emerald-400 border border-emerald-700 text-[10px] px-2 py-0.5 rounded font-mono font-semibold">
                {tool.categoryBangla}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden md:block">
              {tool.englishTitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition"
            title="সরাসরি প্রিন্ট করুন"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">প্রিন্ট প্রিভিউ</span>
          </button>

          <button
            onClick={handleReload}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition"
            title="পৃষ্ঠা রিফ্রেশ করুন"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <a
            href={tool.file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition border border-slate-700"
            title="নতুন উইন্ডোতে খুলুন"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">নতুন উইন্ডো</span>
          </a>
        </div>
      </div>

      {/* Embedded Iframe Container */}
      <div className="flex-1 w-full bg-slate-100 relative">
        <iframe
          ref={iframeRef}
          src={tool.file}
          title={tool.title}
          className="w-full h-full min-h-[calc(100vh-60px)] border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-modals allow-popups"
        />
      </div>
    </div>
  );
};
