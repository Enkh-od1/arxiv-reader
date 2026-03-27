'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function YearFilter({ years }: { years: number[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = searchParams.get('year') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    if (year) {
      router.push(`/archive?year=${year}`);
    } else {
      router.push('/archive');
    }
  };

  return (
    <div className="relative inline-block w-150px">
      <select
        value={currentYear}
        onChange={handleChange}
        className="w-full appearance-none bg-white border border-gray-200 text-[#003d71] text-sm rounded-md py-2 px-3 pr-10 outline-none cursor-pointer hover:border-gray-400 transition-colors"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }} // Browser-ийн үндсэн сумыг бүрэн устгах
      >
        <option value="">Бүх онууд</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y} он
          </option>
        ))}
      </select>
      
      {/* СУМНЫ ДҮРС - Текстээс тусад нь баруун талд нь барина */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </div>
    </div>
  );
}
