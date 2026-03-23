'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors group"
    >
      <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
      <span>Буцах</span>
    </button>
  );
}
