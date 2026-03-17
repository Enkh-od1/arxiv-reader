'use client';

import { useState } from 'react';

export default function ForAuthorsPage() {
  // Анхны утгыг 1 (Тавигдах шаардлага) болгож тохируулсан
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, name: 'Тавигдах шаардлага' },
    { id: 2, name: 'Ёс зүйн хэм хэмжээ' },
    { id: 3, name: 'Хянан магадлагаа' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Гол гарчиг - Тод цэнхэр */}
        <h1 className="text-4xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-12">
          Зохиогчдод зориулсан заавар
        </h1>

        {/* Дэд цэс (Tabs) - "Ерөнхий танилцуулга" хэсэгтэй яг ижил загвар */}
        <div className="flex justify-center space-x-4 mb-12 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-4 font-semibold transition-colors duration-200 ${
                activeTab === tab.id 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Контент солигдох хэсэг - Slate өнгө болон leading-8 зайтай */}
        <div className="[400px]">
          {activeTab === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-[#1e293b] text-[28px] font-bold mb-6">1. Тавигдах шаардлага</h2>
              <p className="text-[#475569] text-lg leading-8 font-normal">
                Академи нь судалгаанд суурилсан мэдлэгийг түгээх, бодлогын шийдэлд хувь нэмэр 
                оруулах зорилгоор эрдэм шинжилгээний бүтээлүүдийг нийтэлдэг. Өгүүлэл нь 
                тодорхой бүтэцтэй, шинжлэх ухааны арга зүйд нийцсэн байна.
              </p>
            </div>
          )}

          {activeTab === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-[#1e293b] text-[28px] font-bold mb-6">2. Ёс зүйн хэм хэмжээ, зарчим</h2>
              <p className="text-[#475569] text-lg leading-8 font-normal">
                Манай сэтгүүл нь олон улсын академик ёс зүйн стандартыг чанд баримталдаг. 
                Ирүүлсэн бүтээл бүрийг плагиат шалгах программ болон мэргэжлийн хяналтаар 
                оруулж, оюуны өмчийн зөрчилгүй болохыг баталгаажуулна.
              </p>
            </div>
          )}

          {activeTab === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-[#1e293b] text-[28px] font-bold mb-6">3. Хөндлөнгийн хянан магадлагаа</h2>
              <p className="text-[#475569] text-lg leading-8 font-normal">
                Хөндлөнгийн хянан магадлагаа (double-blind peer review) нь бүтээлийн чанарыг 
                баталгаажуулах үндсэн шалгуур юм. Хяналтын процесс дунджаар 4-6 долоо хоног 
                үргэлжлэх бөгөөд мэргэжлийн хоёр шүүмжлэгчийн дүгнэлтэд үндэслэнэ.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
