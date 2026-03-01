'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getArticles, Article } from '@/lib/strapi';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Зөвхөн эхний удаа нийтлэл татна
  useEffect(() => {
  async function fetchData() {
    setLoading(true);
    const data = await getArticles();
    setArticles(data);
    setFilteredArticles(data); // ← энд initial утга тохируулах нь зөв (mount үед)
    setLoading(false);
  }
  fetchData();
}, []); // хоосон dependency → зөвхөн mount үед

  // 2. Хайлтын үед шүүх (effect дотор setState-г шууд дуудахгүй)
  useEffect(() => {
    // Хайлт хоосон бол бүх нийтлэлийг харуулна
    if (!searchTerm.trim()) {
      setFilteredArticles(articles);
      return;
    }   

    const lowerSearch = searchTerm.toLowerCase();
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(lowerSearch) ||
      article.summary.toLowerCase().includes(lowerSearch) ||
      article.authors.toLowerCase().includes(lowerSearch)
    );

    setFilteredArticles(filtered);
  }, [searchTerm, articles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Ачаалж байна...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-12 px-4">
      {/* Хайлтын талбар */}
      <div className="max-w-2xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Гарчиг, танилцуулга эсвэл зохиогчоор хайх..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-4 text-lg rounded-full border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Нийтлэлүүд
        {searchTerm && ` (${filteredArticles.length} үр дүн)`}
      </h1>

      {filteredArticles.length === 0 ? (
        <p className="text-center text-xl text-gray-600 py-10">
          {searchTerm ? 'Хайлтын үр дүн олдсонгүй' : 'Одоогоор нийтлэл байхгүй байна'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              {article.coverImage && (
                <div className="relative h-48">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.authors}</span>
                  <span>{new Date(article.published).toLocaleDateString('mn-MN')}</span>
                </div>

                {article.pdfUrl && article.pdfUrl !== '#' && (
                  <a
                    href={article.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    PDF унших →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}