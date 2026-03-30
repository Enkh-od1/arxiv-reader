'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface IssueData {
  id?: number;
  documentId?: string;
  title?: string;
}

interface ArticleAttributes {
  summary_text?: string;
  Summary?: string;
  author_text?: string;
  works_text?: string;
  key?: string;
  Key?: string; 
  title?: string;
  doi?: string;
  publishedAt?: string;
  // Issue нь 'data' дотор байх эсвэл шууд байх тохиолдлыг шийдэх
  issue?: {
    data?: IssueData;
  } | IssueData;
}

interface ArticleProps {
  article: {
    id?: number;
    documentId?: string;
    issue?: {
      data?: {
        id?: number | string;
        documentId?: string;
        attributes?: {
          title?: string;
        };
      };
    };
    attributes?: ArticleAttributes & {
      issue?: {
        data?: {
          id?: number | string;
          documentId?: string;
        };
      };
    };
  } & ArticleAttributes;
}

interface IssueAttributes {
  title?: string;
  publishedAt?: string;
}

interface IssueDataNode {
  id?: string | number;
  documentId?: string;
  attributes?: IssueAttributes;
}

export default function ArticleContent({ article }: ArticleProps) {
  // Өгөгдлийг аюулгүй салгаж авах
  const data = article?.attributes || article;
  const title = data?.title || article?.title || "Гарчиггүй өгүүлэл";

  // 2. issueId болон issueTitle-г авах
  const issueId = 
    article.issue?.data?.id || 
    article.issue?.data?.documentId || 
    article.attributes?.issue?.data?.id || 
    article.attributes?.issue?.data?.documentId;

  // Энэ мөрийг заавал нэмж өгөөрэй:
  const issueData = (article.issue as { data?: IssueDataNode })?.data;

const issueTitle = 
  issueData?.attributes?.title || 
  (article.issue as IssueAttributes)?.title || 
  "Сэтгүүлийн дугаар";

  return (
    <div className="w-full">
      {/* Дээд талын Breadcrumb - Сэтгүүлийн дугаар руу буцах холбоосыг нэмэв */}
      <nav className="text-sm text-slate-500 mb-6 flex gap-2 items-center">
        <Link href="/home" className="hover:text-blue-600 transition-colors">Нүүр</Link>
        <span>/</span>
        <Link href="/archive" className="hover:text-blue-600 transition-colors">Архив</Link>
            <span>/</span>
            <Link href={`/archive/${issueId}`} className="hover:text-blue-600 transition-colors"> 
  Өгүүлэл
</Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* ЗҮҮН ТАЛ: ҮНДСЭН МЭДЭЭЛЭЛ (8 багана) */}
        <div className="lg:col-span-8">
          
          {/* ӨГҮҮЛЛИЙН ГАРЧИГ - 'title' алдааг энд засав */}

          {/* Зохиогчийн хэсэг */}
          {/* Зохиогчийн хэсэг */}
<section className="mb-8">
  <h3 className="text-lg font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-wide">
    Зохиогчийн тухай
  </h3>
  <div className="text-slate-900 leading-snug">
    {data?.author_text ? (
      data.author_text.split('\n').map((line, i) => {
        if (!line.trim()) return null;

        // Нэр, цолтой мөрүүдийг (А., Н. гэх мэтээр эхэлсэн бол) Bold болгох
        const isNameLine = /^[А-Я]\./.test(line.trim());

        return (
          <p 
            key={i} 
            className={isNameLine 
              ? "font-bold text-lg mt-4 text-slate-900" // Нэрний хэв маяг
              : "text-slate-600 text-sm mt-1 ml-1"      // Ажлын газрын хэв маяг (жижиг)
            }
          >
            {line}
          </p>
        );
      })
    ) : (
      <p className="text-slate-400 italic text-sm">Зохиогчийн мэдээлэл байхгүй.</p>
    )}
  </div>
</section>


          {/* DOI хэсэг */}
          {data?.doi && (
            <div className="mb-8 text-sm">
              <span className="font-bold">DOI: </span>
              <a href={data.doi} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.doi}</a>
            </div>
          )}

          {/* Түлхүүр үгс - 'any' ашиглахгүйгээр засав */}
          {(data?.key || data?.Key) && (
            <div className="mb-10 text-sm leading-relaxed">
              <span className="font-bold">Түлхүүр үг: </span>
              <span className="text-slate-700 italic">{data?.key || data?.Key}</span>
            </div>
          )}

          {/* ABSTRACT (Хураангуй) */}
          <section className="mt-12">
            <h3 className="text-lg font-bold border-b-2 border-slate-200 pb-2 mb-6 text-slate-800 uppercase tracking-wide">
              Хураангуй
            </h3>
            <div className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
              {data?.summary_text || data?.Summary || "Хураангуй оруулаагүй байна."}
            </div>
          </section>

          {/* REFERENCES (Эх сурвалж) */}
          {/* REFERENCES (Эх сурвалж) */}
{/* REFERENCES (Эх сурвалж) */}
{data?.works_text && (
  <section className="mt-12">
    <h3 className="text-lg font-bold border-b border-slate-200 pb-2 mb-6 text-slate-800 uppercase tracking-wide">
      Эх сурвалжийн жагсаалт
    </h3>
    <div className="text-slate-700 text-sm leading-relaxed space-y-3">
      {data.works_text.split('\n').map((line, index) => {
        if (!line.trim()) return null;

        // 1. Нэр болон Онг салгах (Bold болгох хэсэг)
        
        // 2. Линк таних функц (Regex)
        const renderWithLinks = (text: string) => {
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          return text.split(urlRegex).map((part, i) => {
            if (part.match(urlRegex)) {
              return (
                <a 
                  key={i} 
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline break-all"
                >
                  {part}
                </a>
              );
            }
            return part;
          });
        };

        return (
          <p key={index} className="pl-5 relative">
            <span className="absolute left-0">•</span>
            {/* Нэр, оныг Bold болгох логик */}
            {line.match(/^([^()]+\(\d{4}\)\.)(.*)/) ? (
              <>
                <strong className="font-bold text-slate-900">
                  {line.match(/^([^()]+\(\d{4}\)\.)/)?.[0]}
                </strong>
                {renderWithLinks(line.replace(/^([^()]+\(\d{4}\)\.)/, ""))}
              </>
            ) : (
              renderWithLinks(line)
            )}
          </p>
        );
      })}
    </div>
  </section>
)}


        </div>

        {/* БАРУУН ТАЛ: SIDEBAR (4 багана) */}
        {/* БАРУУН ТАЛ: SIDEBAR */}
<aside className="lg:col-span-4 space-y-6 pt-10">
  
  {/* 1. PUBLISHED */}
  <div className="bg-slate-100 p-4 rounded-sm border-t-4 border-slate-300">
    <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">Published</p>
    <p className="text-slate-700 text-sm">
      {data?.publishedAt ? new Date(data.publishedAt).toLocaleDateString() : '2025-06-29'}
    </p>
  </div>

  {/* 2. HOW TO CITE */}
<div className="bg-slate-100 p-4 rounded-sm border-t-4 border-slate-300">
  <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">How to Cite</p>
  <div className="text-slate-700 text-[13px] leading-relaxed mb-4">
    {data?.author_text?.split('\n')[0]}, &ldquo;{title}&rdquo;, 
    <span className="italic"> JPA. Journal of Public Administration</span>, 
    {issueTitle ? ` vol. ${issueTitle}` : ''}, {new Date().getFullYear()}.
  </div>
  <select className="w-full text-xs p-2 border border-slate-300 bg-white rounded-sm focus:outline-none">
    <option>More Citation Formats</option>
    <option>APA</option>
    <option>MLA</option>
  </select>
</div>

{/* 3. ISSUE */}
<div className="bg-slate-100 p-4 rounded-sm border-t-4 border-slate-300">
  <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">Issue</p>
  {issueId ? (
    <Link href={`/archive/${issueId}`} className="text-blue-600 text-sm font-medium hover:underline decoration-blue-400">
      {issueTitle || "Vol. 7 No. 1 (2025)"}
    </Link>
  ) : (
    <p className="text-sm text-slate-400">Мэдээлэл байхгүй</p>
  )}
</div>

  {/* 4. LICENSE */}
  <div className="bg-slate-100 p-4 rounded-sm border-t-4 border-slate-300">
    <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">License</p>
    <p className="text-slate-700 text-[12px] leading-snug mb-3">
  Copyright (c) {new Date().getFullYear()} {(() => {
    // 1. Текстийг мөр мөрөөр нь салгах
    const lines = data?.author_text?.split('\n') || [];
    
    // 2. Зөвхөн нэр бүхий мөрүүдийг (жишээ нь: "С.Галбадрах, ...") шүүж авах
    const names = lines
      .filter(line => /^[А-Я]\./.test(line.trim())) // Нэрээр эхэлсэн мөрүүдийг авна
      .map(line => line.split(',')[0].trim());      // Таслалаас өмнөх хэсгийг (нэрийг) авна
    
    // 3. Нэрнүүдийг "болон"-оор холбож харуулна
    return names.join(', ');
  })()}
</p>
    <div className="flex flex-col gap-2">
<div className="flex items-center gap-1 mt-3">
  <Image 
    src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" 
    alt="CC" 
    width={20} 
    height={20} 
    className="w-5 h-5" 
  />
  <Image 
    src="https://mirrors.creativecommons.org/presskit/icons/by.svg" 
    alt="BY" 
    width={20} 
    height={20} 
    className="w-5 h-5" 
  />
  <a 
    href="https://creativecommons.org/licenses/by/4.0/" 
    target="_blank" 
    rel="noreferrer" 
    className="ml-1 text-[11px] text-blue-600 hover:underline font-medium"
  >
    CC BY 4.0
  </a>
</div>
      <p className="text-[11px] text-slate-500">
        This work is licensed under a <a href="https://creativecommons.org" target="_blank" className="text-blue-600 hover:underline">Creative Commons Attribution 4.0 International License</a>.
      </p>
    </div>
  </div>

</aside>


      </div>
    </div>
  );
}