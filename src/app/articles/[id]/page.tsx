import Image from 'next/image';
import Link from 'next/link';
import { getArticleById } from '@/lib/strapi';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-2xl text-red-600 font-medium">Нийтлэл олдсонгүй</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Буцах товч */}
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 text-lg font-medium"
        >
          ← Нүүр хуудас руу буцах
        </Link>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header зураг + гарчиг */}
          <div className="relative">
            {article.coverImage && (
              <div className="h-64 md:h-80 relative">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover brightness-75"
                  priority
                  unoptimized
                />
              </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {article.title}
              </h1>
              
            </div>
          </div>

          {/* Үндсэн контент */}
          <div className="p-8 md:p-12 lg:p-16">
            {/* Abstract */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Хураангуй</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {article.summary}
              </p>
            </div>

            {/* Metadata grid (fileSize, downloads-г хассан) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 bg-gray-50 p-8 rounded-xl border border-gray-100">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Зохиогч
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  {article.authors || 'Тодорхойгүй'}
                </p>
              </div>

              </div>

            {/* PDF товч */}
            {article.pdfUrl && article.pdfUrl !== '#' && (
              <div className="flex justify-center">
                <a
                  href={article.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-medium text-lg shadow-lg transition-all transform hover:scale-105"
                >
                  PDF унших (Татах)
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            )}

            {!article.pdfUrl || article.pdfUrl === '#' ? (
              <p className="text-center text-gray-500 italic mt-4">
                PDF файл байхгүй байна
              </p>
            ) : null}
          </div>
        </article>
      </div>
    </main>
  );
}