// src/app/editorial/page.tsx
import Image from 'next/image';
import { getEditorialMembers } from '@/lib/strapi';
import type { EditorialMember } from '@/lib/strapi';

export const dynamic = 'force-dynamic';

export default async function EditorialBoard() {
  const members: EditorialMember[] = await getEditorialMembers() || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-bold text-[#003d71] mb-6 text-center">
          Сэтгүүлийн Зөвлөл
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.length > 0 ? (
            members.map((member) => (
              <div key={member.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700">
                {member.photo && (
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
                    <Image
                      src={member.photo}
                      // Эндээс ${member.surname}-ийг хассан
                      alt={member.name} 
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-center text-slate-900 dark:text-slate-100">
                  {/* Эндээс {member.surname}-ийг хассан */}
                  {member.name}
                </h3>
                <p className="text-center text-blue-600 dark:text-blue-400 font-medium">{member.position}</p>
                <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-2">{member.affiliation}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-slate-500">Мэдээлэл олдсонгүй.</p>
          )}
        </div>
      </div>
    </div>
  );
}
