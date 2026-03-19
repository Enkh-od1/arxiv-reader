// src/app/archive/page.tsx
import { getIssues, Issue } from '@/lib/strapi'; // lib-ээсээ дуудна
import Image from 'next/image';
import Link from 'next/link';

export default async function ArchivePage() {
  // getIssues функцийг энд дахин тодорхойлох хэрэггүй, шууд ашиглана
  const issues: Issue[] = await getIssues();
  
  if (!issues || issues.length === 0) {
    return <div className="text-center py-20">Мэдээлэл олдсонгүй. Серверээ шалгана уу.</div>;
  }

  const grouped = issues.reduce((acc: Record<number, Issue[]>, issue: Issue) => {
    const year = Number(issue.year);
    if (!acc[year]) acc[year] = [];
    acc[year].push(issue);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#003d71] mb-12 border-b-2 pb-4 tracking-tight">
        Сэтгүүлийн архив
      </h1>
      
      {years.map((yearStr) => {
        const year = Number(yearStr);
        return (
          <section key={year} className="mb-16">
            <h2 className="text-2xl font-serif mb-8 text-slate-500 border-l-4 border-slate-200 pl-4">
              {year} он
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {grouped[year].map((issue: Issue) => (
                <Link href={`/archive/${issue.documentId}`} key={issue.id} className="group">
                  <div className="relative aspect-3/4 shadow-md group-hover:shadow-2xl transition-all duration-500 rounded-xl overflow-hidden border border-slate-100">
                    <Image 
                      src={issue.coverUrl || '/placeholder.png'} 
                      alt={issue.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#003d71] line-clamp-2 transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">Дугаар: {issue.number}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
