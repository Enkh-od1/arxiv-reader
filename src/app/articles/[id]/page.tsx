// app/articles/[id]/page.tsx
import { getArticleByDocumentId } from '@/lib/strapi';
import ArticleContent from '@/components/ArticleContent';
import BackButton from '@/components/BackButton'; // Таны бүтэц дэх зам

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articleData = await getArticleByDocumentId(id);

  if (!articleData) return <p className="text-center py-20">Өгүүлэл олдсонгүй.</p>;

  // Strapi v4/v5 дээр өгөгдөл ихэвчлэн { id, attributes: { ... } } бүтэцтэй ирдэг
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white min-h-screen">
      <BackButton />
      
      <header className="mb-10">
        {/* Хэрэв гарчиг харагдахгүй байвал articleData.attributes.title гэж оролдоорой */}
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
          {articleData.attributes?.title || articleData.title}
        </h1>
        <p className="text-lg text-slate-500 font-medium italic">
          {articleData.attributes?.authors || articleData.authors}
        </p>
      </header>

      {/* Асуудлыг шийдэх гол хэсэг: Бүх өгөгдлийг ArticleContent руу дамжуулна */}
      <ArticleContent article={articleData} />
    </div>
  );
}
