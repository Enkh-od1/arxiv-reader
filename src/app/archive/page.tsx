import { getArchives } from '@/lib/strapi'; // эсвэл таны байршил
import Image from 'next/image';
import Link from 'next/link';
export const dynamic = 'force-dynamic';

interface Archive {
  id: number;
  title: string;        // VOL. 24, NO. S1 (2026)
  subtitle?: string;
  year: number;         // 2026
  seasonOrNo?: string;  // No. S1, No. 1 гэх мэт
  coverImage: string | null;
  pdfUrl: string | null;
}

// Архивыг year-аар бүлэглэх функц
function groupByYear(archives: Archive[]) {
  const grouped = archives.reduce((acc, archive) => {
    const year = archive.year ?? new Date().getFullYear(); // fallback жил
    if (!acc[year]) acc[year] = [];
    acc[year].push(archive);
    return acc;
  }, {} as Record<number, Archive[]>);

  return Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a));
}

export default async function ArchivePage() {
  const archives = await getArchives();

  const groupedArchives = groupByYear(archives);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Том толгой */}
        <h1 className="text-5xl md:text-6xl font-bold text-teal-900 mb-12 text-center">
          Archives
        </h1>

        {groupedArchives.length > 0 ? (
          <div className="space-y-16">
            {groupedArchives.map(([year, volumes]) => (
              <div key={year} className="space-y-6">
                {/* Жилийн толгой */}
                <h2 className="text-4xl font-bold text-teal-800 border-b-2 border-teal-200 pb-4">
                  {year} он
                </h2>

                {/* Энэ жилийн volume-ууд */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {volumes.map((volume) => (
                    <div
                      key={volume.id}
                      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 flex flex-col"
                    >
                      {/* Cover зураг */}
                      {volume.coverImage ? (
                        <div className="relative aspect-7/4 overflow-hidden">
                          <Image
                            src={volume.coverImage}
                            alt={volume.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-3/4 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-center px-4">
                            Cover байхгүй
                          </span>
                        </div>
                      )}

                      {/* Мэдээлэл */}
                      <div className="p-6 flex flex-col grow">
                        <h3 className="text-2xl font-bold text-teal-900 mb-2">
                          {volume.title}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {volume.seasonOrNo || volume.subtitle}
                        </p>

                        {/* PDF товч */}
                        {volume.pdfUrl ? (
                          <Link
                            href={volume.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition duration-300"
                          >
                            Унших / Татах
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </Link>
                        ) : (
                          <p className="mt-auto text-gray-500 text-center">PDF байхгүй</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-xl">
            Одоогоор архив байхгүй байна
          </div>
        )}
      </div>
    </div>
  );
}