import { getIssueById, Article } from '@/lib/strapi';
import PdfButton from '@/components/PdfButton';
import ExpandableSummary from '@/components/ExpandableSummary';
import { FileText, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function IssueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const issue = await getIssueById(id);

  if (!issue) return <p className="text-center py-20 text-slate-500 font-medium">Сэтгүүл олдсонгүй.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white">
      {/* 1. Сэтгүүлийн толгой хэсэг (Header) */}
      <div className="flex flex-col md:flex-row gap-10 mb-16 border-b pb-12 items-center md:items-start">
        <div className="w-44 h-60 relative shadow-xl rounded-md overflow-hidden border border-slate-100 shrink-0">
          <Image 
            src={issue.coverUrl || '/placeholder.png'} 
            alt={issue.title} 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="flex-1 text-center md:text-left pt-2">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
            {issue.title}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-semibold text-sm uppercase tracking-wider">
            <span className="bg-slate-100 px-3 py-1 rounded">Он: {issue.year}</span>
            <span className="bg-slate-100 px-3 py-1 rounded">Дугаар: {issue.number}</span>
          </div>
        </div>
      </div>

      {/* 2. Өгүүллүүдийн жагсаалт */}
      <div className="space-y-12">
        <h2 className="text-xl font-black text-slate-800 border-b-2 border-slate-900 pb-2 inline-block">
          ЭНЭ ДУГААРТ:
        </h2>

        {issue.articles?.map((article: Article,) => (
          <div key={article.id} className="group border-b border-slate-100 pb-10 last:border-0 transition-all">
            
            {/* А. Өгүүллийн гарчиг */}
            <Link href={`/articles/${article.documentId}`}>
      <h3 className="text-xl font-bold text-slate-900 mb-3 cursor-pointer hover:text-blue-700 transition-colors">
        {article.title}
      </h3>
    </Link>
            
            {/* Б. Зохиогч (Италик, саарал) */}
            <p className="text-[15px] text-slate-500 mb-4 font-medium">
              {article.authors}
            </p>

            {/* В. PDF Линк (Том товч биш, цэнхэр линк) */}
            <div className="mb-4">
              {article.pdfUrl ? (
                <PdfButton 
                  articleId={article.documentId} 
                  pdfUrl={article.pdfUrl} 
                  currentViews={article.views} 
                />
              ) : (
                <span className="text-slate-300 text-xs italic">Линк олдсонгүй</span>
              )}
            </div>

            {/* Г. Мета өгөгдөл (Хуудас, Үзсэн тоо) */}
            <div className="flex items-center gap-6 text-slate-400 text-[13px] font-semibold mb-5">
              <div className="flex items-center gap-1.5">
                <FileText size={16} strokeWidth={2.5} />
                <span>{article.pageCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={16} strokeWidth={2.5} />
                <span>{article.views ?? 0}</span>
              </div>
            </div>

            {/* Д. Хураангуй (Дэлгэрдэг хэсэг) */}
            {article.summary && (
              <ExpandableSummary summary={article.summary} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
