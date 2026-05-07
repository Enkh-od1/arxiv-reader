import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import localFont from 'next/font/local';
import { Noto_Sans } from 'next/font/google';

// 1. Фонтын замыг зааж өгөх (src/app/ дотор байгаа бол ../../public/...)
const mogulHelios = localFont({
  src: '../../public/fonts/Mogul Helios.ttf', 
  variable: '--font-mogul',
  fallback: ['Inter', 'sans-serif'],  // ← НЭМСЭН
  adjustFontFallback: 'Arial',         // ← НЭМСЭН
});

const notoSans = Noto_Sans({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],  // 'cyrillic' заавал нэмэх!
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Төрийн удирдлага',
  description: 'Монгол arXiv өгүүлэл хайгч',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. html эсвэл body дээрээ mogulHelios.variable-г нэмнэ
    <html lang="mn" className={`${mogulHelios.variable} ${notoSans.className}`}>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
