import { getJournalInfo } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestArticle } from '@/lib/strapi';
import type { Partner, InformationSection } from '@/types/journal';
export const dynamic = 'force-dynamic'; // Энийг нэмснээр Build хийх үед алдаа гарахгүй


export default async function Home() {
  const journal = await getJournalInfo();
  const latestArticle = await getLatestArticle();
if (!journal) {
    return <div className="p-10 text-center">Мэдээлэл ачаалахад алдаа гарлаа.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 py-8 md:px-10">
        
        {/* 1. Focus and Scope - Текстийг хоёр тийш нь тэлсэн */}
        <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-teal-100">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-teal-900 text-center">
            Focus and Scope
          </h2>
          {/* max-w-none нэмснээр текст хоёр тийшээ бүрэн тэлнэ */}
          <div className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-800 prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: journal.focusAndScope || '' }} />
          </div>

          {/* Сүүлийн нийтлэл (Archive-аас хамгийн сүүлд нэмэгдсэн нь) */}
          {latestArticle && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-lg font-semibold text-teal-800 mb-4">
                Сүүлийн нийтлэл:
              </p>
              
              {/* Нийтлэлийн ковер зураг */}
              {latestArticle.coverImage ? (
  <div className="mb-6 w-full max-w-2xl">
    <Image
  src={(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://192.168.10.31:1337') + latestArticle.coverImage}
  alt={latestArticle.title || "Cover image"}
  width={800}
  height={450}
  unoptimized
      className="rounded-xl shadow-md object-cover w-full h-auto"
    />
  </div>
) : null}

              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                {latestArticle.title}
              </h4>
              
              {latestArticle.summary && (
                <p className="text-gray-700 leading-relaxed mb-5 text-base">
                  {latestArticle.summary}
                </p>
              )}

              {latestArticle.pdfUrl && (
                <a
                  href={latestArticle.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition duration-300 text-base"
                >
                  PDF татах
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Баруун тал - Information + Partners */}
        <div className="space-y-8">
          {/* Information блок */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-teal-100">
            <h2 className="text-3xl font-bold mb-6 text-teal-900 text-center">
              Information
            </h2>
            <div className="space-y-6 text-center">
              {(journal.informationSections?.length ?? 0) > 0 ? (
                journal.informationSections?.map((section: InformationSection, index: number) => (
                  <div key={index} className="pb-4 border-b border-gray-50 last:border-0">
                    {section.sectionLogo && (
                      <div className="mx-auto mb-4 w-28 h-28 flex items-center justify-center bg-gray-50 rounded-full border-2 border-teal-200 p-3">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://192.168.10.31:1337'}${section.sectionLogo}`}
                          alt={section.sectionTitle || 'Section logo'}
                          width={100}
                          height={100}
                          unoptimized
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-teal-800">{section.sectionTitle}</h3>
                    {section.sectionDescription && (
                      <p className="text-gray-700 mt-2 text-sm">{section.sectionDescription}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Мэдээлэл байхгүй</p>
              )}
            </div>
          </div>

          {/* Partners блок */}
          {/* Partners блок */}
<div className="bg-white p-6 rounded-2xl shadow-xl border border-teal-100">
  <h2 className="text-3xl font-bold mb-8 text-teal-900 text-center">
    Partners
  </h2>

  <div className="flex flex-col space-y-10"> {/* Нэг мөрөнд нэг байхаар цувуулав */}
    {(journal.partners?.length ?? 0) > 0 ? (
      journal.partners?.map((partner: Partner, index: number) => (
        <Link
          key={index}
          href={partner.partnerUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center hover:scale-[1.02] transition-transform duration-300"
        >
          {partner.partnerLogo && (
            <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200 p-6 mb-4 shadow-sm group-hover:border-teal-300">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://192.168.10.31:1337'}${partner.partnerLogo}`}
                alt={partner.partnerName || 'Partner'}
                width={200} // Зургийг илүү өргөн болгосон
                height={150}
                unoptimized
                className="object-contain max-h-full"
              />
            </div>
          )}
          <p className="text-lg font-bold text-center text-gray-800 group-hover:text-teal-600">
            {partner.partnerName}
          </p>
        </Link>
      ))
    ) : (
      <p className="text-center text-gray-500">Хамтрагч байхгүй</p>
    )}
  </div>
</div>

        </div>

      </div>
    </main>
  );
}
