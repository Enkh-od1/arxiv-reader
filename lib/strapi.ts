const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Strapi-ээс ирэх raw item-ийн type (nested structure-тэй)
interface StrapiRawArticle {
  id: number;
  attributes: {
    title?: string;
    summary?: string;
    pdfUrl?: string;
    releaseDate?: string;
    authors?: string;
    coverImage?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
    category?: {
      data?: {
        attributes?: {
          name: string;
        };
      };
    };
    volume?: string;
    issue?: string;
  };
}

// Next.js-д ашиглах type
export interface Article {
  id: number;
  title: string;
  summary: string;
  pdfUrl: string;
  published: string;
  authors: string;
  coverImage: string | null;
  category: string;
  volume?: string;
  issue?: string;
}

interface StrapiRawEditorial {
  id: number;
  attributes: {
    name?: string;
    surname?: string;
    position?: string;
    affiliation?: string;
    bio?: string;
    order?: number;
    photo?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

export interface EditorialMember{
  id: number;
  name: string;
  surname: string;
  position: string;
  affiliation: string;
  bio: string;
  photo: string | null;
  order?: number;
}

export async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?populate=*&sort=releaseDate:desc&pagination[limit]=10`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      console.error('Articles fetch failed:', res.status);
      return [];
    }

    const json = await res.json();

    return json.data.map((item: StrapiRawArticle) => {
      const attr = item.attributes || {};

      return {
        id: item.id,
        title: attr.title || 'Гарчиггүй',
        summary: attr.summary || 'Танилцуулга байхгүй',
        pdfUrl: attr.pdfUrl || '#',
        published: attr.releaseDate || new Date().toISOString(),
        authors: attr.authors || 'Зохиогч тодорхойгүй',
        coverImage: attr.coverImage?.data?.attributes?.url
          ? `${STRAPI_URL}${attr.coverImage.data.attributes.url}`
          : null,
        category: attr.category?.data?.attributes?.name || 'Бүгд',
        volume: attr.volume || 'Тодорхойгүй',
        issue: attr.issue || 'Тодорхойгүй',
      };
    });
  } catch (error) {
    console.error('Articles fetch error:', error);
    return [];
  }
}

// Editorial members-г татах функц (шаардлагатай бол ашигла)
export async function getEditorialMembers(): Promise<EditorialMember[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/editorial-members?populate=photo&sort=order:asc`,
      { cache: 'no-store' }
    );

    if (!res.ok) return [];

    const json = await res.json();

    return json.data.map((item: StrapiRawEditorial) => {
  const attr = item.attributes || {};

  return {
    id: item.id,
    name: attr.name || '',
    surname: attr.surname || '',
    position: attr.position || 'Албан тушаал байхгүй',
    affiliation: attr.affiliation || 'Харьяалал байхгүй',
    bio: attr.bio || '',
    photo: attr.photo?.data?.attributes?.url
      ? `${STRAPI_URL}${attr.photo.data.attributes.url}`
      : null,
    order: attr.order || 999,
  };
});
  } catch (error) {
    console.error('Editorial members fetch error:', error);
    return [];
  }
}