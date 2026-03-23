'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface AuthorData {
  requirements?: string;
  ethics?: string;
  review?: string;
}

export default function ForAuthorsClient({ initialData }: { initialData: { attributes?: AuthorData } & AuthorData }) {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, name: 'Тавигдах шаардлага', field: 'requirements' as const, title: 'Тавигдах шаардлага' },
    { id: 2, name: 'Ёс зүйн хэм хэмжээ', field: 'ethics' as const, title: 'Ёс зүйн хэм хэмжээ' },
    { id: 3, name: 'Хянан магадлагаа', field: 'review' as const, title: 'Хөндлөнгийн хянан магадлагаа' },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);
  const rawData = initialData?.attributes || initialData;
  const rawContent = currentTab ? rawData?.[currentTab.field] : null;

  const formattedContent = rawContent
    ?.split('\n')
    ?.map((line: string) => line.trim())
    ?.reduce((acc: string, line: string, i: number, arr: string[]) => {
      const isTableLine = line.startsWith('|');
      const nextIsTable = arr[i + 1]?.trim().startsWith('|');
      if (isTableLine && nextIsTable) {
        return acc + line + '\n';
      }
      return acc + line + '\n\n';
    }, '');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#003d71] mb-6 text-center uppercase">
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
          <h2 className="text-2xl md:text-3xl font-black text-[#003d71] mb-8">
  {currentTab?.title}
</h2>
          
          {/* --- Агуулгын хэсгийг шинэчлэх --- */}
<div className="prose prose-slate max-w-none dark:prose-invert 
  text-justify 
  /* 1. Мөр хоорондын зайг (line-height) хамгийн бага болгох */
  leading-1.7
  /* 2. Догол мөр (p) хоорондын зайг бүрэн устгах */
  prose-p:my-0 
  /* 3. Жагсаалтын (li) дээд доод зайг бүрэн арилгах */
  prose-li:my-0 
  /* 4. Жагсаалтын блок (ul/ol) хоорондын зайг багасгах */
  prose-ul:my-2 
  prose-ol:my-2
  /* Бусад загварууд */
  prose-strong:text-[#003d71]
  prose-table:border prose-table:border-collapse prose-table:w-full
  prose-th:border prose-th:border-slate-300 prose-th:p-2 prose-th:bg-gray-100
  prose-td:border prose-td:border-slate-300 prose-td:p-2">
  
  {formattedContent ? (
    <ReactMarkdown
      components={{
        h3: ({ ...props }) => (
          /* Гарчиг хоорондын зайг мөн багасгав */
          <h3 className="text-center text-lg md:text-xl font-bold text-[#003d71] mt-4 mb-2 uppercase" {...props} />
        ),
        // Зураг харуулах логик хэвээрээ
        img: ({ src, alt }) => (
          <span className="block my-6 relative w-full overflow-hidden rounded-2xl shadow-xl border border-slate-100 bg-white p-2">
            <Image
              src={(src as string) || "/ENKHOD01.png"} 
              alt={alt || 'Process Map'}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </span>
        ),
      }}
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
