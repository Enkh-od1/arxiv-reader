import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import localFont from 'next/font/local';

// 1. Фонтын замыг зааж өгөх (src/app/ дотор байгаа бол ../../public/...)
const mogulHelios = localFont({
  src: '../../public/fonts/Mogul Helios.ttf', 
  variable: '--font-mogul'
});

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="mn" className={`${mogulHelios.variable} ${inter.className}`}>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
