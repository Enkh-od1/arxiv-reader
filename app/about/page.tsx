// app/about/page.tsx

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black">
      {/* Navbar */}
      

      {/* Гол контент */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-12">
          Эрдэм шинжилгээний сэтгүүл
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          {/* Энд таны хүссэн текст, зураг, жагсаалт гэх мэт орно */}
          <p className="lead text-xl mb-8">
            Академи нь судалгаанд суурилсан мэдлэгийг түгээж, бодлогын шийдэлд хувь нэмэр оруулах зорилгоор эрдэм шинжилгээний бүтээлүүдийг тогтмол хэвлэн нийтэлдэг.
          </p>
          {/* ... бусад текст ... */}
        </div>
      </div>
    </div>
  );
}