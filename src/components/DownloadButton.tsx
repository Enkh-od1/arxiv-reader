'use client';

import { updateArticleViews } from '@/lib/strapi';
import { useState } from 'react';

interface DownloadButtonProps {
  article: {
    id: number;
    documentId: string;
    views: number;
    pdfUrl: string | null;
  };
}

export default function DownloadButton({ article }: DownloadButtonProps) {
  const [viewCount, setViewCount] = useState<number>(article.views || 0);

  const handleAction = async () => {
  // 1. Линк эсвэл файл байгаа эсэхийг шалгах
  if (!article.pdfUrl || article.pdfUrl === '#') {
    alert("Унших файл эсвэл линк олдсонгүй.");
    return;
  }

  try {
    // 2. Үзсэн тоог шинэчлэх
    const success = await updateArticleViews(article.documentId, viewCount);
    if (success) {
      setViewCount((prev) => prev + 1);
    }
  } catch (error) {
    console.error("Stats update failed:", error);
  }

    // ХАМГИЙН ЧУХАЛ ХЭСЭГ: URL-ийг бүтэн болгох
    // Хэрэв зам нь /uploads/... гэж эхэлж байвал Strapi-ийн хаягийг урд нь заавал залгана
    const strapiUrl = 'https://naog.edu.mn';
  
  // Хэрэв линк нь 'http'-ээр эхэлсэн байвал шууд нээнэ (Гадны линк)
  // Үгүй бол Strapi-ийн хаягийг залгана (Дотоод файл)
  const finalUrl = article.pdfUrl.startsWith('http') 
    ? article.pdfUrl 
    : `${strapiUrl}${article.pdfUrl}`;

  window.open(finalUrl, '_blank');
};

  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
        <span className="text-red-800 text-lg">👁️</span>
        <span>Үзсэн: {viewCount}</span>
      </div>

      <button 
        onClick={handleAction}
        className="px-6 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all text-sm border border-blue-100"
      >
        PDF Унших
      </button>
    </div>
  );
}
