'use client';

import { updateArticleViews } from '@/lib/strapi';
import { useState } from 'react';

interface DownloadButtonProps {
  article: {
    id: number;
    views: number;
    pdfUrl: string | null;
  };
}

export default function DownloadButton({ article }: DownloadButtonProps) {
  const [viewCount, setViewCount] = useState<number>(article.views || 0);

  const handleAction = async () => {
    if (!article.pdfUrl || article.pdfUrl === '#') {
      alert("PDF файл олдсонгүй.");
      return;
    }

    try {
      const success = await updateArticleViews(article.id, viewCount);
      if (success) {
        setViewCount((prev: number) => prev + 1);
      }
    } catch (error) {
      console.error("Stats update failed:", error);
    }

    // ХАМГИЙН ЧУХАЛ ХЭСЭГ: URL-ийг бүтэн болгох
    // Хэрэв зам нь /uploads/... гэж эхэлж байвал Strapi-ийн хаягийг урд нь заавал залгана
    const strapiUrl = 'http://jpa.naog.edu.mn:1337';
    const fullUrl = article.pdfUrl.startsWith('http') 
      ? article.pdfUrl 
      : `${strapiUrl}${article.pdfUrl}`;
      
    window.open(fullUrl, '_blank');
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
