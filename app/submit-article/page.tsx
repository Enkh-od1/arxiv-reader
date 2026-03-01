'use client';

import { useState } from 'react';

export default function SubmitArticle() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/send-article-request', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        alert('Хүсэлт амжилттай илгээгдлээ! Бид удахгүй холбогдох болно.');
        form.reset();
      } else {
        setError(result.message || 'Илгээхэд алдаа гарлаа. Дахин оролдоно уу.');
      }
    } catch (err) {
      setError('Сервертэй холбогдоход алдаа гарлаа. Интернет холболтоо шалгана уу.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Өгүүлэл илгээх хүсэлт
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Та өөрийн өгүүллийг бидэнд илгээхийг хүсвэл доорх маягтыг бөглөнө үү.
        </p>

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 mb-8 rounded">
            <p className="font-bold">Амжилттай илгээгдлээ!</p>
            <p>Бид таны хүсэлтийг хүлээн авлаа. Удахгүй холбогдох болно. Баярлалаа!</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 mb-8 rounded">
            <p className="font-bold">Алдаа гарлаа</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Овог нэр <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="surname"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Овог нэрээ оруулна уу"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Таны имэйл хаяг <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Таны имэйл хаяг (холбоо барихад ашиглана)"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Өгүүллийн гарчиг <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Өгүүллийн гарчиг"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Товч танилцуулга (200-300 үг) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="summary"
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Өгүүллийн гол санааг товч бичнэ үү..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Файл хавсаргах (PDF, Word гэх мэт)
            </label>
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              Нэмэлт мэдээлэл / тайлбар
            </label>
            <textarea
              name="additional"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Нэмэлт тайлбар, хүсэлт байвал бичнэ үү..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 text-white font-bold rounded-lg transition duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Илгээж байна...' : 'Хүсэлт илгээх'}
          </button>
        </form>
      </div>
    </main>
  );
}