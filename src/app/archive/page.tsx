// src/app/archive/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getIssues, type Issue } from '@/lib/strapi';

export default async function ArchivePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { issues, pagination } = await getIssues(currentPage, 19); // Илүү олон сэтгүүл харуулахын тулд 20 болгов

  // --- ОН ОНООР НЬ БҮЛЭГЛЭХ ЛОГИК ---
  const groupedIssues = issues.reduce((acc: Record<number, Issue[]>, issue: Issue) => {
  const year = issue.year;
  if (!acc[year]) acc[year] = [];
  acc[year].push(issue);
  return acc;
}, {} as Record<number, Issue[]>);

  // Онуудыг ихээс нь бага руу эрэмбэлэх (2025, 2024...)
  const years = Object.keys(groupedIssues)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10 border-l-4 border-[#003d71] text-[#003d71] pl-4">Сэтгүүлийн архив</h1>
      
      {/* Сэтгүүлүүдийн жагсаалт (Он оноор) */}
      {years.map((year) => (
        <div key={year} className="mb-16">
          {/* Оны гарчиг болон зураас */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-serif text-gray-400 whitespace-nowrap">{year} он</h2>
            <div className="h-1px bg-gray-200 w-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {groupedIssues[year].map((issue: Issue) => (
              <Link key={issue.id} href={`/archive/${issue.documentId}`} className="group">
                <div className="relative aspect-3/4 mb-4 overflow-hidden rounded shadow-sm group-hover:shadow-xl transition-all border border-gray-100">
                  <Image 
                    src={issue.coverUrl || '/no-cover.jpg'} 
                    alt={issue.title} 
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#003366] text-sm uppercase leading-tight">
                    {issue.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-medium">
                    Дугаар: {issue.number}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* --- ПАГИНАЦ --- */}
      {pagination && pagination.pageCount > 1 && (
        <div className="mt-16 flex justify-center items-center gap-4">
          {currentPage > 1 && (
            <Link 
              href={`/archive?page=${currentPage - 1}`}
              className="px-4 py-2 bg-white border rounded-md hover:bg-slate-50 transition-colors"
            >
              Өмнөх
            </Link>
          )}
          <span className="text-sm font-medium text-slate-500">
            Хуудас {currentPage} / {pagination.pageCount}
          </span>
          {currentPage < pagination.pageCount && (
            <Link 
              href={`/archive?page=${currentPage + 1}`}
              className="px-4 py-2 bg-white border rounded-md hover:bg-slate-50 transition-colors"
            >
              Дараагийн
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
