'use client';

import { updateArticleViews } from '@/lib/strapi';
import { useState } from 'react';

// 1. 'any'-ийн оронд төрлийг нь тодорхой зааж өгнө
interface ArticleData {
  id: number;
  views: number;
  pdfUrl: string | null;
}

interface DownloadButtonProps {
  article: ArticleData;
}

export default function DownloadButton({ article }: DownloadButtonProps) {
  // Дэлгэц дээрх тоог удирдах state
  const [viewCount, setViewCount] = useState<number>(article.views || 0);

  const handleAction = async () => {
    if (!article.pdfUrl || article.pdfUrl === '#') {
      alert("PDF файл олдсонгүй.");
      return;
    }

    // 1. Strapi руу хандаж тоог 1-ээр нэмнэ
    const success = await updateArticleViews(article.id, viewCount);
    
    if (success) {
      // 2. Дэлгэц дээрх тоог шууд 1-ээр нэмж харуулна
      setViewCount((prev: number) => prev + 1);
    }
    
    // 3. PDF файлыг нээнэ
    window.open(article.pdfUrl, '_blank');
  };

  return (
    <div className="flex items-center space-x-6">
      {/* Үзсэн тоо харагдах хэсэг */}
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
