const STRAPI_URL = 'http://192.168.10.31:1337';

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
    country?: string;
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
  country?: string;
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
    const res = await fetch('http://192.168.10.31:1337/api/articles?populate=*&sort=releaseDate:desc&pagination[limit]=10', {
  cache: 'no-store',
});

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
        country: attr.country || 'Тодорхойгүй',
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

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles/${id}?populate=*`,
      { cache: 'no-store' }
    );

    if (!res.ok) return null;

    const json = await res.json();
    const attr = json.data.attributes || {};

    return {
      id: json.data.id,
      title: attr.title || 'Гарчиггүй',
      summary: attr.summary || 'Танилцуулга байхгүй',
      pdfUrl: attr.pdfUrl || '#',
      published: attr.releaseDate || new Date().toISOString(),
      authors: attr.authors || 'Зохиогч тодорхойгүй',
      coverImage: attr.coverImage?.data?.attributes?.url
        ? `${STRAPI_URL}${attr.coverImage.data.attributes.url}`
        : null,
        category: attr.category?.data?.attributes?.name || 'Тодорхойгүй',
        country: attr.country || 'Тодорхойгүй',
      // улс нэмэх бол attr.country эсвэл affiliation ашиглаж болно
    };
  } catch (error) {
    console.error('Article fetch error:', error);
    return null;
  }
}

export async function getJournalInfo() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/journal-infos?populate=*`, {
      cache: 'no-store',
    });

    if (!res.ok) return {};

    const json = await res.json();
    const data = json.data[0]?.attributes || {};

    return {
      journalName: data.journalName || '',
      journalLogoUrl: data.journalLogo?.data?.attributes?.url
        ? `${STRAPI_URL}${data.journalLogo.data.attributes.url}`
        : null,
      focusAndScope: data.focusAndScope || '',
      issn: data.issn || '',
      eissn: data.eissn || '',
      aboutText: data.aboutText || '',
      partners: data.partners || [],
      ebscoLogo: data.ebscoLogo?.data?.attributes?.url
        ? `${STRAPI_URL}${data.ebscoLogo.data.attributes.url}`
        : null,
      doiLogo: data.doiLogo?.data?.attributes?.url
        ? `${STRAPI_URL}${data.doiLogo.data.attributes.url}`
        : null,
    };
  } catch (error) {
    console.error('Journal info fetch error:', error);
    return {};
  }
}
