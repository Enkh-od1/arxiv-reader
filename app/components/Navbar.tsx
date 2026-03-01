"use client";

import Link from 'next/link';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="text-2xl font-bold">
              arXiv Explorer
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            <li><Link href="/about" className="hover:text-blue-200 transition">Сэтгүүлийн тухай</Link></li>
            <li><Link href="/editorial" className="hover:text-blue-200 transition">Сэтгүүлийн зөвлөл</Link></li>
            <li><Link href="/archive" className="hover:text-blue-200 transition">Архив</Link></li>
            <li><Link href="/submit-article" className="hover:text-blue-200 transition">Хүсэлт илгээх</Link></li>
            <li><Link href="/contact" className="hover:text-blue-200 transition">Холбоо барих</Link></li>
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
            <li><Link href="/about" className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>Сэтгүүлийн тухай</Link></li>
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