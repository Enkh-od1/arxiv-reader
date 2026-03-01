'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getEditorialMembers, EditorialMember } from '@/lib/strapi';  // функцын нэр зөв байгаа эсэхээ шалга
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'; // eslint-disable-line @typescript-eslint/no-unused-vars


export default function EditorialBoard() {
  const [members, setMembers] = useState<EditorialMember[]>([]);  // эсвэл зөв type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMembers() {
      try {
        setLoading(true);
        setError(null);
        const data = await getEditorialMembers();
        setMembers(data);
      } catch (error) {
  console.error('Editorial load error:', error);
  setError('Редакцын гишүүдийн мэдээллийг ачаалахад алдаа гарлаа');
} finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 dark:text-slate-100 mb-12">
          Сэтгүүлийн Зөвлөл
        </h1>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Ачаалж байна...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-600 dark:text-red-400 text-lg">
            {error}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-20 text-slate-600 dark:text-slate-400 text-lg">
            Одоогоор сэтгүүлийн зөвлөлийн мэдээлэл байхгүй байна.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map((member) => (
              <div
  key={member.id}
  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-gray-700 flex flex-col items-center p-6 text-center"
>
{/* Зургийн блок – дотор нь нэр, текст, overlay огт байхгүй */}
<div className="relative w-48 h-48 mb-6 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
  {member.photo ? (
    <Image
      src={member.photo}
      alt={`${member.name} ${member.surname || ''}`}
      fill
      className="object-cover"           // ← ЭНД object-cover биш object-contain болгосон
      unoptimized
    />
  ) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500 text-4xl">?</span>
    </div>
  )}
</div>

<h3 className="text-2xl font-bold text-center mb-2">
  {member.surname || ''} {member.name || 'Нэр байхгүй'}
</h3>

<p className="text-blue-600 font-medium text-center text-lg">
  {member.position || 'Албан тушаал байхгүй'}
</p>

<p className="text-gray-700 dark:text-gray-300 text-center mt-3">
  {member.affiliation || 'Харьяалал байхгүй'}
</p>

<p className="mt-4 text-gray-600 dark:text-gray-400 text-center leading-relaxed">
  {member.bio || 'Дэлгэрэнгүй мэдээлэл бэлэн болно...'}
</p>

</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

