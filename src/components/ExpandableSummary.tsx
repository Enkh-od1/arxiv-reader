'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableSummaryProps {
  summary: string;
  keywords?: string; // Түлхүүр үг нэмэлтээр авна
}

export default function ExpandableSummary({ summary, keywords }: ExpandableSummaryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2 w-full overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-blue-900 text-[15px] font-bold hover:underline transition-all"
      >
        <span>Хураангуй</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isOpen && (
        <div className="mt-3 text-[14.5px] text-slate-700 leading-relaxed text-justify pl-4 border-l-2 border-blue-100 w-full words animate-in fade-in slide-in-from-top-1 duration-300">
          {/* Хураангуй текст */}
          <p className="mb-3 whitespace-pre-line">
            {summary}
          </p>

          {/* Түлхүүр үгс - Зөвхөн утгатай үед харагдана */}
          {keywords && (
            <div className="mt-4 pt-3 border-t border-slate-50">
              <span className="font-bold text-blue-900">Түлхүүр үг: </span>
              <span className="font-medium italic text-slate-600">
                {keywords}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
