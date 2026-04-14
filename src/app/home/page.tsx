import { getJournalInfo, getLatestIssue } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import type { Partner, InformationSection } from '@/types/journal';
import ReactMarkdown from 'react-markdown';


export const dynamic = 'force-dynamic';

export default async function Home() {
  // Бүх өгөгдлийг сервер талаас зэрэг дуудна
  const journal = await getJournalInfo();
  const latestIssue = await getLatestIssue();

  if (!journal) {
    return <div className="p-10 text-center text-gray-500 font-medium">Мэдээлэл ачаалахад алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 py-8 md:px-10 max-w-1600px mx-auto">
        
        {/* Зүүн тал - Үндсэн мэдээллийн хэсэг */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* 1. Сэтгүүлийн тухай товч тодорхойлолт */}
          <section className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-blue-100">
  <h2 className="text-2xl md:text-3xl font-bold text-[#003d71] mb-8 text-center">
    Сэтгүүлийн тухай
  </h2>

  {/* Текстийг ReactMarkdown ашиглан харуулах хэсэг */}
  <div className="text-slate-700 leading-relaxed text-justify text-sm md:text-base 
                  prose prose-slate max-w-none 
                  prose-strong:font-bold prose-strong:text-[#003d71]">
    <ReactMarkdown>
      {journal.focusAndScope || ''}
    </ReactMarkdown>
  </div>
</section>

          {/* 2. Шинэ дугаар (Issue) - Хамгийн сүүлийн Архиваас */}
          {/* 2. Шинэ дугаар (Issue) - Арай жижиг хувилбар */}
{latestIssue && (
  <section className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-blue-100 overflow-hidden relative">
    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#003d71]"></div>
    
    <h2 className="text-lg font-bold text-[#003d71] mb-4 flex items-center gap-2">
      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">!</span>
      Шинэ дугаар:
    </h2>
    
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-blue-50/30 p-4 rounded-xl">
      {/* Сэтгүүлийн ковер - Хэмжээг w-52-оос w-32 болгож багасгав */}
      <div className="relative w-32 h-44 md:w-40 md:h-56 shrink-0 shadow-xl rounded-lg overflow-hidden border-2 border-white">
        <Image
          src={latestIssue.coverUrl || '/no-cover.jpg'}
          alt={latestIssue.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Дугаарын мэдээлэл - Текстийн хэмжээг багасгав */}
      <div className="flex flex-col justify-center text-center md:text-left py-2">
        <span className="text-[#003d71] font-bold text-sm px-2 py-0.5 bg-white rounded-full w-fit shadow-sm mx-auto md:mx-0">
          {latestIssue.year} он
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-[#003d71] mt-2 mb-4 leading-tight">
          № {latestIssue.number} <br className="md:block" /> ({latestIssue.title})
        </h3>
        <Link 
          href={`/archive/${latestIssue.documentId}`}
          className="bg-[#003d71] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md w-fit mx-auto md:mx-0 text-sm"
        >
          Дугаарыг үзэх
        </Link>
      </div>
    </div>
  </section>
)}


        </div>

        {/* Баруун тал - Мэдээлэл болон Үүсгэн байгуулагч */}
        <aside className="space-y-8">
          
          {/* Мэдээлэл блок */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100 sticky top-8">
            <h2 className="text-2xl font-bold text-[#003d71] mb-8 text-center border-b pb-4">
              Мэдээлэл
            </h2>
            <div className="space-y-8 text-center">
              {/* 1. Мэдээлэл: Гар бичмэл хүлээн авах */}
    <div className="group">
      <p className="text-slate-700 mt-2 text-sm">
        Төрийн удирдлага сэтгүүл 2026 оны эхний дугаартаа өгүүлэл авч байна. Та бүхнийг бүтээлээ ирүүлэхийг урья.
      </p>
      <p className="text-slate-700 mt-2 text-sm leading-relaxed">
        Цахим шуудан : jpa@naog.edu.mn
      </p>
       {/* --- ШИНЭЭР НЭМЭХ ХЭСЭГ: Зураг товч --- */}
      <div className="mt-8 flex justify-center">
  <Link 
    href="/for-authors" 
    className="block transition-all active:scale-95 duration-200 text-blue-600 hover:text-blue-800 font-medium underline"
  >
    Дэлгэрэнгүй үзэх
  </Link>
</div>
      
    </div>
              {(journal.informationSections?.length ?? 0) > 0 ? (
                journal.informationSections?.map((section: InformationSection, index: number) => (
                  <div key={index} className="group">
                    {section.sectionLogo && (
                      <div className="mx-auto mb-4 w-24 h-24 flex items-center justify-center bg-gray-50 rounded-full border-2 border-blue-50 p-3 group-hover:border-blue-200 transition-colors">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://naog.edu.mn'}${section.sectionLogo}`}
                          alt={section.sectionTitle || 'Section logo'}
                          width={200}
                          height={150}
                          unoptimized
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-[#003d71]">{section.sectionTitle}</h3>
                    {section.sectionDescription && (
                      <p className="text-gray-500 mt-2 text-xs leading-relaxed">{section.sectionDescription}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic"></p>
              )}
            </div>

            {/* Үүсгэн байгуулагч блок - Мэдээлэл дотор эсвэл доор нь байрлуулж болно */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-[#003d71] mb-8 text-center">
                Эрхлэн гаргагч
              </h2>
              <div className="space-y-8">
                {journal.partners?.map((partner: Partner, index: number) => (
                  <Link
                    key={index}
                    href={partner.partnerUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-center"
                  >
                    {partner.partnerLogo && (
  /* 1. flex items-center justify-center нэмснээр хайрцаг доторх бүх зүйл голлоно */
  <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200 p-6 mb-4 shadow-sm group-hover:border-blue-300 transition-all">
    <Image
      src={`http://naog.edu.mn${partner.partnerLogo}`}
      alt={partner.partnerName || 'Partner'}
      width={200}
      height={150}
      unoptimized
      /* 2. mx-auto нэмж зургийг хэвтээ тэнхлэгийн дагуу голлуулна */
      className="object-contain max-h-full mx-auto" 
    />
  </div>
)}
                    <p className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                      {partner.partnerName}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}
