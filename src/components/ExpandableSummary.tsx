'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ExpandableSummary({ summary }: { summary: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2 w-full overflow-hidden"> {/* Гадагшаа халихаас сэргийлнэ */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-[#0ea5e9] text-[13px] hover:underline"
      >
        Хураангуй {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      
      {isOpen && (
        <div className="mt-2 text-sm text-slate-600 leading-relaxed text-justify pl-3 border-l-2 border-slate-100 w-full words">
          {/* break-words: Урт үгийг хүчээр мөр шилжүүлнэ */}
          {summary}
        </div>
      )}
    </div>
  );
}
