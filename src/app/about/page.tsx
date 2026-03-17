'use client'; // Client component болгох шаардлагатай

import { useState } from 'react';

export default function AboutPage() {
  // Аливаа дэд цэс идэвхтэй байгааг хадгалах state
  const [activeTab, setActiveTab] = useState('intro'); // 'intro' эсвэл 'policy'

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black">
      {/* Гол контент */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-12">
          Эрдэм шинжилгээний сэтгүүл
        </h1>

        {/* Дэд цэс (Sub-menu) */}
        <div className="flex justify-center space-x-4 mb-10 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('intro')}
            className={`pb-2 px-4 font-semibold transition-colors ${
              activeTab === 'intro' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            Ерөнхий танилцуулга
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`pb-2 px-4 font-semibold transition-colors ${
              activeTab === 'policy' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            Нийтлэлийн бодлого
          </button>
        </div>

        {/* Контент солигдох хэсэг */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          {activeTab === 'intro' ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Сэтгүүлийн тухай</h2>
              <p className="lead text-xl">
                Академи нь судалгаанд суурилсан мэдлэгийг түгээх, бодлогын шийдэлд хувь нэмэр оруулах зорилгоор эрдэм шинжилгээний бүтээлүүдийг нийтэлдэг.
              </p>
              {/* Бусад танилцуулга текст энд орно */}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Нийтлэлийн бодлого</h2>
              <p>
                Манай сэтгүүл нь олон улсын стандартын дагуу хянан магадлагаа (peer-review) хийж, чанартай бүтээлүүдийг сонгон шалгаруулж нийтэлдэг.
              </p>
              <ul className="list-disc pl-5">
                <li>Эх хувь байх шаардлага</li>
                <li>Ёс зүйн хяналт</li>
                <li>Хянан магадлагааны явц</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
