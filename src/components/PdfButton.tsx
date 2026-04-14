'use client';

import { FileText } from 'lucide-react';
import { updateArticleViews } from '@/lib/strapi';
import { useRouter } from 'next/navigation'; // 1. Router нэмсэн

interface PdfButtonProps {
  articleId: string; 
  pdfUrl: string;
  currentViews: number;
}

export default function PdfButton({ articleId, pdfUrl, currentViews }: PdfButtonProps) {
  const router = useRouter(); // 2. Router зарласан

  const handleViewPdf = async () => {
    // 1. Үзэлтийн тоог сервер дээр шинэчлэх
    const success = await updateArticleViews(articleId, currentViews);

    if (success) {
      // 2. Дэлгэц дээрх тоог (0-ийг 1 болгож) шинэчлэх
      router.refresh(); 
    }

    // 3. Линк рүү үсрэх
    const strapiBaseUrl = 'https://naog.edu.mn';
    const finalUrl = pdfUrl.startsWith('http') ? pdfUrl : `${strapiBaseUrl}${pdfUrl}`;
    window.open(finalUrl, '_blank');
  };

  return (
    <button 
      onClick={handleViewPdf}
      className="flex items-center gap-2 bg-white border border-red-200 text-red-600 px-6 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 font-bold text-sm shadow-sm"
    >
      <FileText size={18} />
      PDF Унших
    </button>
  );
}
