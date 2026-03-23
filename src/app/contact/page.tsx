// app/contact/page.tsx

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black transition-colors duration-500">
      {/* Хөх Navbar */}
      

      {/* Гол контент */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-12">
          Холбоо барих
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p className="lead text-xl mb-8">
            Бидэнтэй холбогдохыг хүсвэл доорх мэдээллээр холбогдоно уу.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6">
                Байгууллагын хаяг
              </h2>
              <p className="mb-4">
                Email: <Link href="mailto:info@arxiv-explorer.mn" className="text-blue-600 dark:text-blue-400 hover:underline">jpa@naog.gov.mn</Link>
              </p>
              <p className="mb-4">
                Утас: +70133043
              </p>
              <p>
                Хаяг: Улаанбаатар хот, Хан-Уул дүүрэг, 17-р хороо, Удирдлагын академи
              </p>
            </div>

            
          </div>

        
        </div>
      </div>
    </div>
  );
}