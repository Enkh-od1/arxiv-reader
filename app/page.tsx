// app/page.tsx эсвэл archive/page.tsx дотор
import Image from 'next/image';
import Link from 'next/link';
import { getJournalInfo } from '@/lib/strapi';  // шинэ функц үүсгэнэ
export const dynamic = 'force-dynamic';

export default async function Home() {
  const journal = await getJournalInfo();  // Strapi-аас 1 entry татна

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Дээд хэсэг – сэтгүүлийн нэр + лого */}
      <header className="bg-teal-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          {journal.journalLogoUrl && (
            <div className="mb-4">
              <Image
                src={journal.journalLogoUrl}
                alt={journal.journalName}
                width={200}
                height={100}
                className="mx-auto"
              />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold">
            {journal.journalName || 'ТӨРИЙН УДИРДЛАГА СЭТГҮҮЛ'}
          </h1>
        </div>
      </header>

      {/* Дэлгэрэнгүй мэдээлэл */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Focus and Scope */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Focus and Scope</h2>
            <div dangerouslySetInnerHTML={{ __html: journal.focusAndScope || '' }} />
          </div>

          {/* About */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">About</h2>
            <div dangerouslySetInnerHTML={{ __html: journal.aboutText || '' }} />
          </div>

          {/* Хамтрагч байгууллагууд + лого */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Partners</h2>
            <div className="grid grid-cols-2 gap-4">
  {journal.partners?.map((partner: { 
    partnerName: string;
    partnerLogo?: string;
    partnerUrl?: string;
  }, index: number) => (
    <Link key={index} href={partner.partnerUrl || '#'} target="_blank">
      <div className="text-center hover:opacity-80 transition">
        {partner.partnerLogo && (
          <Image
            src={partner.partnerLogo}
            alt={partner.partnerName}
            width={120}
            height={60}
            className="mx-auto mb-2"
          />
        )}
        <p className="text-sm font-medium">{partner.partnerName}</p>
      </div>
    </Link>
  ))}
</div>

            {/* EBSCO, DOI лого */}
            <div className="mt-8 flex justify-center gap-8">
              {journal.ebscoLogo && (
                <Image src={journal.ebscoLogo} alt="EBSCO" width={100} height={40} />
              )}
              {journal.doiLogo && (
                <Image src={journal.doiLogo} alt="DOI" width={100} height={40} />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}