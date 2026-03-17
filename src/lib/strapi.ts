const STRAPI_URL = 'http://jpa.naog.edu.mn:1337'; 


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


// lib/strapi.ts эсвэл types/archive.ts файлд нэм (эсвэл байгаа бол өргөтгө)
interface ArchiveItem {
  id: number;
  attributes: {
    title: string;
    subtitle?: string;
    year?: number;
    seasonOrNo?: string;
    publishedDate: string;
    cover?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    pdf?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

// Нийтлэлийн төрлийг тодорхойлох

// lib/strapi.ts

export interface Niitlel {
  id: number;
  attributes: {
    Title: string;
    Year: number;
    Author: string;
    Summary: string;
    Views?: number;
    Downloads?: number;
    Cover?: { data?: { attributes?: { url: string } } };
    PDF_File?: { data?: { attributes?: { url: string } } };
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

// Мэдээллийн хэсгийн төрөл
interface StrapiSection {
  sectionTitle: string;
  sectionDescription?: string;
  sectionLogo?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
}

interface StrapiPartner {
  partnerName: string;
  partnerUrl?: string;
  partnerLogo?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
}

export interface JournalInfo {
  journalName?: string;
  journalLogoUrl?: string;
  focusAndScope?: string;
  issn?: string;
  eissn?: string;
  aboutText?: string;
  partners: Partner[];
  informationSections: InfoSection[];
}

export interface Partner {
  partnerName: string;
  partnerLogo?: string;
  partnerUrl?: string;
}

export interface InfoSection {
  sectionTitle: string;
  sectionDescription?: string;
  sectionLogo?: string;
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
    const res = await fetch('http://jpa.naog.edu.mn:1337/api/articles?populate=*&sort=releaseDate:desc&pagination[limit]=10', {
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
    // ?populate=* гэхийн оронд бүх түвшний зургийг авахын тулд илүү нарийн populate бичсэн
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/journal-infos?populate[informationSections][populate]=*&populate[partners][populate]=*`,
      { cache: 'no-store' }
    );

    if (!res.ok) return null;

    const json = await res.json();
    
    // Эхний датаг авах
    const data = json.data?.[0]?.attributes;
    if (!data) return null;

    return {
      focusAndScope: data.focusAndScope || '',
      
      // Information хэсгийг цэгцлэх
      informationSections: data.informationSections?.map((section: StrapiSection) => ({
        sectionTitle: section.sectionTitle,
        sectionDescription: section.sectionDescription,
        // Зургийн URL-ийг Strapi-ийн гүн бүтэц дотроос зөв ухаж гаргах
        sectionLogo: section.sectionLogo?.data?.attributes?.url || null,
      })) || [],

      // Partners хэсгийг цэгцлэх
      partners: data.partners?.map((partner: StrapiPartner) => ({
        partnerName: partner.partnerName,
        partnerUrl: partner.partnerUrl || '#',
        // Зургийн URL-ийг Strapi-ийн гүн бүтэц дотроос зөв ухаж гаргах
        partnerLogo: partner.partnerLogo?.data?.attributes?.url || null,
      })) || [],
    };
  } catch (error) {
    console.error("getJournalInfo error:", error);
    return null;
  }
}





// lib/strapi.ts
// lib/strapi.ts доторх getLatestArticle функц:

// lib/strapi.ts доторх getLatestArticle функц

export async function getLatestArticle() {
  const STRAPI_URL = 'http://jpa.naog.edu.mn:1337'; 
  
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc&pagination[limit]=1`, { cache: 'no-store' });
    const json = await res.json();
    
    if (!json.data || json.data.length === 0) return null;

    const item = json.data[0];
    const attr = item.attributes;

    return {
      id: item.id,
      title: attr.title || attr.Title || 'Гарчиггүй',
      summary: attr.summary || attr.Summary || 'Танилцуулга байхгүй',
      views: attr.views ?? attr.Views ?? 0,
      downloads: attr.downloads ?? attr.Downloads ?? 0,
      
      // Таны Strapi дээрх PDF_File нэршлийг яг ижилхэн болгож засав
      pdfUrl: attr.PDF_File?.data?.attributes?.url || null,
      
      // Cover-ийг мөн ижил логикоор шалгах
      coverImage: attr.Cover?.data?.attributes?.url || attr.cover?.data?.attributes?.url || null,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}





export async function getArchives() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/archives?populate=*&sort=publishedDate:desc`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      console.error('Archives fetch failed:', res.status);
      return [];
    }

    const json = await res.json();

    return json.data.map((item: ArchiveItem) => ({
      id: item.id,
      title: item.attributes.title,
      subtitle: item.attributes.subtitle || '',
      year: item.attributes.year || new Date(item.attributes.publishedDate || "").getFullYear(),
      seasonOrNo: item.attributes.seasonOrNo || '', // эсвэл subtitle-аас авч болно
      coverImage: item.attributes.cover?.data?.attributes?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.cover.data.attributes.url}`
        : null,
      pdfUrl: item.attributes.pdf?.data?.attributes?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.pdf.data.attributes.url}`
        : null,
    }));
  } catch (error) {
    console.error('getArchives error:', error);
    return [];
  }
}

// lib/strapi.ts

export async function updateArticleStats(id: number, type: 'views', currentCount: number) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          [type]: (currentCount || 0) + 1, // Одоо байгаа тоон дээр 1-ийг нэмнэ
        },
      }),
    });

    if (!res.ok) throw new Error('Статистик шинэчлэхэд алдаа гарлаа');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// lib/strapi.ts
// lib/strapi.ts
// lib/strapi.ts
// lib/strapi.ts
export async function updateArticleViews(id: number, currentViews: number) {
  const STRAPI_URL = 'http://jpa.naog.edu.mn:1337';
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          Views: Number(currentViews || 0) + 1, // Strapi дээр томоор бол Views
        },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}





