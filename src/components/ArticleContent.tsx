// components/ArticleContent.tsx
'use client';
import React, { useState } from 'react';

interface ArticleProps {
  article: {
    id?: number;
    attributes?: {
      Summary?: string;
      summary_text?: string;
      author_text?: string;
      works_text?: string; 
      key?: string;
      Key?: string; 
      
    };
    // Хэрэв өгөгдөл flatten хийгдсэн бол:
    Summary?: string;
    summary_text?: string;
    author_text?: string;
    works_text?: string;

  };
}

export default function ArticleContent({ article }: ArticleProps) {
  const [activeTab, setActiveTab] = useState('summary');

  // ТАНЫ ТЕРМИНАЛ ДЭЭР ӨГӨГДӨЛ 'attributes' ДОТОР БАЙГАА ТУЛ ИНГЭЖ УНШИНА
  const data = article?.attributes || article;

  return (
    <div className="w-full">
      {/* Табуудын товчлуур (summary, author, works) */}
      <div className="flex border-b mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab('summary')} className={`px-6 py-4 font-bold ${activeTab === 'summary' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}>Хураангуй</button>
        <button onClick={() => setActiveTab('author')} className={`px-6 py-4 font-bold ${activeTab === 'author' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}>Зохиогчийн тухай</button>
        <button onClick={() => setActiveTab('works')} className={`px-6 py-4 font-bold ${activeTab === 'works' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}>Эх сурвалжийн жагсаалт</button>
      </div>

      <div className="min-h-300px">
        {/* 1. ХУРААНГУЙ */}
{activeTab === 'summary' && (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 animate-in fade-in duration-500">
    <div className="text-slate-900 leading-relaxed text-lg whitespace-pre-line">
      {data?.summary_text || data?.Summary || "Хураангуй оруулаагүй байна."}
      
      {/* Түлхүүр үгсийг энд нэмж байна */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {((data as any)?.key || (data as any)?.Key) && (
        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-[16px] text-slate-700">
            <span className="font-bold text-blue-900">Түлхүүр үг: </span>
            <span className="font-medium italic">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(data as any)?.key || (data as any)?.Key}
            </span>
          </p>
        </div>
      )}
    </div>
  </div>
)}

        {/* 2. ЗОХИОГЧИЙН ТУХАЙ */}
        {/* 2. ЗОХИОГЧИЙН ТУХАЙ */}
{activeTab === 'author' && (
  <div className="text-slate-900 leading-relaxed text-lg whitespace-pre-line">
  {data?.author_text ? (
    data.author_text.split('\n').map((line: string, index: number) => {
      const trimmedLine = line.trim();
      // Bullet-тэй мөр эсэхийг шалгах
      const isBullet = trimmedLine.startsWith('•') || trimmedLine.startsWith('-');
      // Хоосон мөр биш бөгөөд bullet-гүй бол энэ нь "Нэр" эсвэл "Албан тушаал" байна
      const isHeader = trimmedLine.length > 0 && !isBullet;

      return (
        <p 
          key={index} 
          className={`
            ${isBullet ? 'pl-8 -indent-5 text-slate-700 font-normal' : ''} 
            ${isHeader ? 'text-blue-900 font-bold mb-2 mt-4' : ''} 
            mb-1
          `}
        >
          {line}
        </p>
      );
    })
  ) : (
    "Зохиогчийн мэдээлэл байхгүй."
  )}
</div>


)}


        {/* 3. БҮТЭЭЛИЙН ЖАГСААЛТ */}
        {/* 3. БҮТЭЭЛИЙН ЖАГСААЛТ */}
{activeTab === 'works' && (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 animate-in fade-in duration-500">
    <div className="text-slate-900 leading-relaxed text-lg whitespace-pre-line">
      {data?.works_text ? (
        data.works_text.split('\n').map((line: string, index: number) => {
          const trimmedLine = line.trim();
          // Bullet (• эсвэл -) эхэлсэн эсэхийг шалгах
          const isBullet = trimmedLine.startsWith('•') || trimmedLine.startsWith('-');

          // URL-ыг таньж холбоос болгох функц
          const renderLineWithLinks = (text: string) => {
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const parts = text.split(urlRegex);
            return parts.map((part, i) => 
              urlRegex.test(part) ? (
                <a 
                  key={i} 
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-700 underline hover:text-blue-800 break-all transition-colors"
                >
                  {part}
                </a>
              ) : (
                part
              )
            );
          };

          return (
            <p 
              key={index} 
              className={`
                ${isBullet ? 'pl-8 -indent-5 text-slate-700 font-normal' : 'font-medium text-slate-900 mt-4 mb-2'} 
                mb-1
              `}
            >
              {renderLineWithLinks(line)}
            </p>
          );
        })
      ) : (
        "Бүтээлийн жагсаалт хоосон байна."
      )}
    </div>
  </div>
)}

      </div>
    </div>
  );
}
