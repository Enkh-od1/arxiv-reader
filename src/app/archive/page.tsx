import Image from 'next/image';
import DownloadButton from '@/components/DownloadButton'; // Замаа зөв эсэхийг шалгаарай
import { Niitlel } from '@/lib/strapi';

// 1. Strapi-аас өгөгдөл татах функц
async function getArticles() {
  const STRAPI_URL = 'http://jpa.naog.edu.mn:1337';
  
  try {
    // Бүх нийтлэлийг хамгийн сүүлийнхээс нь эхэлж татах
    const res = await fetch(`${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Өгөгдөл татахад алдаа гарлаа:", error);
    return [];
  }
}

export default async function ArchivePage() {
  const articles = await getArticles();
  const STRAPI_URL = 'http://jpa.naog.edu.mn:1337';

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white min-h-screen">
      {/* Хуудасны гарчиг */}
      <h1 className="text-3xl font-extrabold text-[#1e293b] mb-12 border-b pb-4">
        Сэтгүүлийн архив
      </h1>

      <div className="space-y-12">
        {articles.length > 0 ? (
          articles.map((article: Niitlel) => {
            const item = article.attributes;
            const coverUrl = item.Cover?.data?.attributes?.url;
            const pdfUrl = item.PDF_File?.data?.attributes?.url;

            return (
              <div key={article.id} className="flex flex-col md:flex-row gap-8 border-b border-gray-100 pb-12 last:border-0">
                
                {/* 1. Зүүн талын зураг (Cover) */}
                <div className="relative w-full md:w-48 h-64 shrink-0 overflow-hidden rounded-lg shadow-sm">
                  {coverUrl ? (
                    <Image
                      src={`${STRAPI_URL}${coverUrl}`}
                      alt={item.Title || "Cover"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      Зураггүй
                    </div>
                  )}
                </div>

                {/* 2. Баруун талын мэдээллийн хэсэг */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Он болон Зохиогч */}
                    <div className="flex items-center space-x-3 text-sm text-gray-500 mb-3">
                      <span className="font-semibold text-blue-600">{item.Year} он</span>
                      <span>•</span>
                      <span className="font-medium">{item.Author}</span>
                    </div>

                    {/* Гарчиг */}
                    <h2 className="text-2xl font-bold text-[#1e293b] mb-4 leading-tight">
                      {item.Title}
                    </h2>

                    {/* Хураангуй (Summary) */}
                    <p className="text-[#475569] text-base leading-7 line-clamp-3 mb-6">
                      {item.Summary}
                    </p>
                  </div>

                  {/* 3. Статистик болон Товчлуур (DownloadButton) */}
                  <div className="mt-auto">
                    {pdfUrl ? (
                      <DownloadButton 
                        article={{
                          id: article.id,
                          views: item.Views ?? 0, // Strapi дээрх 'Views' талбар
                          pdfUrl: `${STRAPI_URL}${pdfUrl}`
                        }} 
                      />
                    ) : (
                      <p className="text-xs text-red-500 italic">Файл хавсаргаагүй байна</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 text-gray-500">
            Нийтлэл олдсонгүй.
          </div>
        )}
      </div>
    </div>
  );
}
