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
        <button onClick={() => setActiveTab('works')} className={`px-6 py-4 font-bold ${activeTab === 'works' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}>Бүтээлийн жагсаалт</button>
      </div>

      <div className="min-h-300px">
        {/* 1. ХУРААНГУЙ */}
        {activeTab === 'summary' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 animate-in fade-in duration-500">
            <div className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
              {/* summary_text эсвэл Summary-г уншина */}
              {data?.summary_text || data?.Summary || "Хураангуй оруулаагүй байна."}
            </div>
          </div>
        )}

        {/* 2. ЗОХИОГЧИЙН ТУХАЙ */}
        {activeTab === 'author' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 animate-in fade-in duration-500">
            <div className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
              {data?.author_text || "Зохиогчийн мэдээлэл байхгүй."}
            </div>
          </div>
        )}

        {/* 3. БҮТЭЭЛИЙН ЖАГСААЛТ */}
        {activeTab === 'works' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 animate-in fade-in duration-500">
            <div className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
              {data?.works_text || "Бүтээлийн жагсаалт хоосон байна."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
