'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AuthorData {
  requirements?: string;
  ethics?: string;
  review?: string;
}

export default function ForAuthorsClient({ initialData }: { initialData: { attributes?: AuthorData } & AuthorData }) {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, name: 'Тавигдах шаардлага', field: 'requirements' as const, title: 'Тавигдах шаардлага' },
    { id: 2, name: 'Ёс зүйн хэм хэмжээ', field: 'ethics' as const, title: 'Ёс зүйн хэм хэмжээ, зарчим' },
    { id: 3, name: 'Хянан магадлагаа', field: 'review' as const, title: 'Хөндлөнгийн хянан магадлагаа' },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);
  const rawData = initialData?.attributes || initialData;
  const rawContent = currentTab ? rawData?.[currentTab.field] : null;

  // --- ЭНД ЛОГИКОО НЭМНЭ ---
  // Текст доторх бүх Enter-ийг цэвэрлэж, Markdown-д зориулж 2 Enter болгох
  const formattedContent = rawContent
  ?.split('\n')
  ?.map((line: string) => line.trim())
  ?.reduce((acc: string, line: string, i: number, arr: string[]) => {
    const isTableLine = line.startsWith('|');
    const nextIsTable = arr[i + 1]?.trim().startsWith('|');

    // Хэрэв одоогийн мөр болон дараагийн мөр хоёулаа хүснэгт бол ганцхан Enter авна
    if (isTableLine && nextIsTable) {
      return acc + line + '\n';
    }
    // Бусад үед (жишээ нь 1.1, 1.2) хоёр Enter авч зай үүсгэнэ
    return acc + line + '\n\n';
  }, ''); 

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#003d71] mb-6 text-center">
          Зохиогчдод зориулав
        </h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-12 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-4 font-semibold transition-all ${
                activeTab === tab.id 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="animate-fadeIn min-h-400px">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003d71] mb-6">
            {currentTab?.title}
          </h2>
          
          {/* --- ЭНЭ ХЭСГИЙГ ШИНЭЧЛЭВ --- */}
          <div className="prose prose-slate max-w-none dark:prose-invert 
                /* Хүснэгтийн хүрээ болон загвар */
                prose-table:border prose-table:border-collapse prose-table:w-full
                prose-th:border prose-th:border-slate-300 prose-th:p-3 prose-th:bg-gray-100
                prose-td:border prose-td:border-slate-300 prose-td:p-3
                text-justify">
            {formattedContent ? (
              <ReactMarkdown
  components={{
    // h3 гарчгийг голлуулж, өнгийг нь тохируулах
    // 'node'-ийг огт бичихгүй орхивол ESLint алдаа гарахгүй
    h3: ({ ...props }) => (
      <h3 
        className="text-center text-lg md:text-xl font-bold text-[#003d71] my-8 uppercase" 
        {...props} 
      />
    ),
  }}
  // 'remarkPlugins=' гэдгийг зөвхөн нэг удаа бичнэ
  remarkPlugins={[remarkGfm]}
>
  {formattedContent}
</ReactMarkdown>
            ) : (
              <p className="text-gray-400 italic text-center py-10">Мэдээлэл оруулаагүй байна...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
