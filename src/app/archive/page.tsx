import Link from 'next/link';
import Image from 'next/image';
import { getIssues, type Issue } from '@/lib/strapi';
import YearFilter from '@/components/YearFilter';

export default async function ArchivePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string; year?: string }> 
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const selectedYear = params.year ? Number(params.year) : undefined;

  // getIssues функц руу selectedYear-ийг дамжуулна
  const { issues, pagination } = await getIssues(currentPage, 20, selectedYear);

  // Боломжит онуудын жагсаалт
  const availableYears = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017]; 

  // Онууудаар бүлэглэх логик
  const groupedIssues = issues.reduce((acc: Record<number, Issue[]>, issue: Issue) => {
    const year = issue.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(issue);
    return acc;
  }, {} as Record<number, Issue[]>);

  const years = Object.keys(groupedIssues).map(Number).sort((a, b) => b - a);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <nav className="text-sm text-slate-500 mb-6 flex gap-2 items-center">
        <Link href="/home" className="hover:text-blue-600 transition-colors">Нүүр</Link>
        <span></span>

      </nav>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b pb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#003d71] mb-6 text-center">Сэтгүүлийн архив</h1>

        {/* --- DROPDOWN ШҮҮЛТҮҮР --- */}
        <div className="flex items-center gap-3">
  <span className="text-sm font-medium text-slate-900 text-bold whitespace-nowrap">
    Оноор шүүх:
  </span>
  <YearFilter years={availableYears} />
</div>
      </div>

      {/* Сэтгүүлүүдийн жагсаалт */}
      {years.length > 0 ? (
        years.map((year) => (
          <div key={year} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 whitespace-nowrap">{year} он</h2>
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
                    <h3 className="font-bold text-[#003366] text-sm uppercase leading-tight">{issue.title}</h3>
                    <p className="text-gray-400 text-xs font-medium">Дугаар: {issue.number}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-500">Уучлаарай, энэ онд сэтгүүл олдсонгүй.</p>
          <Link href="/archive" className="text-[#003d71] underline mt-4 inline-block">Бүх сэтгүүлийг харах</Link>
        </div>
      )}

      {/* ПАГИНАЦ */}
      {pagination && pagination.pageCount > 1 && (
        <div className="mt-16 flex justify-center items-center gap-4">
          {currentPage > 1 && (
            <Link 
              href={`/archive?page=${currentPage - 1}${selectedYear ? `&year=${selectedYear}` : ''}`}
              className="px-4 py-2 bg-white border rounded-md hover:bg-slate-50 transition-colors text-sm"
            >
              Өмнөх
            </Link>
          )}
          <span className="text-sm font-medium text-gray-500">
            Хуудас {currentPage} / {pagination.pageCount}
          </span>
          {currentPage < pagination.pageCount && (
            <Link 
              href={`/archive?page=${currentPage + 1}${selectedYear ? `&year=${selectedYear}` : ''}`}
              className="px-4 py-2 bg-white border rounded-md hover:bg-slate-50 transition-colors text-sm"
            >
              Дараагийн
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
