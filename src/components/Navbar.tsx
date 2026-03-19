"use client";

import Link from 'next/link';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="text-white shadow-lg sticky top-0 z-50" 
  style={{ backgroundColor: '#003d71' }} // Логоны арын өнгөтэй яг ижил
>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="text-2xl font-bold flex items-center gap-3">
  {/* Логог Next.js Image компонентоор сольсон нь: */}
  <Image 
    src="/logo_back.png" 
    alt="Logo" 
    width={75}  // w-10 нь 40px-тэй тэнцэнэ
    height={75} // h-10 нь 40px-тэй тэнцэнэ
    className="object-contain"
  />
  <span>Төрийн удирдлага</span>
</Link>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            <li><Link href="/about" className="hover:text-blue-200 transition">Нийтлэлийн бодлого</Link></li>
            <li><Link href="/editorial" className="hover:text-blue-200 transition">Сэтгүүлийн зөвлөл</Link></li>
            <li><Link href="/archive" className="hover:text-blue-200 transition">Архив</Link></li>
            <li><Link href="/for-authors" className="hover:text-blue-200 transition">Зохиогчдод</Link></li>
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="bg-white text-blue-800 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition shadow-md">
              Нэвтрэх
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <ul className="lg:hidden mt-6 flex flex-col gap-4">
            <li><Link href="/about" className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>Нийтлэлийн бодлого</Link></li>
            <li><Link href="/editorial" className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>Сэтгүүлийн зөвлөл</Link></li>
            <li><Link href="/archive" className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>Архив</Link></li>
            <li><Link href="/submit-article" className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>Хүсэлт илгээх</Link></li>
            <li><Link href="/contact" className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>Холбоо барих</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}