// app/articles/[id]/page.tsx
import { getArticleByDocumentId } from '@/lib/strapi';
import ArticleContent from '@/components/ArticleContent';
import BackButton from '@/components/BackButton';

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articleData = await getArticleByDocumentId(id);

  if (!articleData) return <p className="text-center py-20">Өгүүлэл олдсонгүй.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white min-h-screen">
      <BackButton />
      
      <header className="mb-10">
        <h1 
  className="text-3xl font-extrabold text-slate-900 mb-4 leading-tight"
  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
>
  {articleData.attributes?.title || articleData.title}
</h1>
        <p className="text-lg text-slate-500 font-medium italic font-sans">
          {articleData.attributes?.authors || articleData.authors}
        </p>
      </header>

      <ArticleContent article={articleData} />
    </div>
  );
}