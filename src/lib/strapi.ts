const STRAPI_URL = 'https://jpa.naog.edu.mn';

// --- Интерфэйсүүдийг export хийх ---
export interface EditorialMember {
  id: number;
  name: string;
  position: string;
  affiliation: string;
  photo: string | null;
  bio?: string;
  order?: number;
}

interface StrapiIssue {
  id: number;
  documentId?: string;
  attributes?: {
    Title?: string;
    Year?: string | number;
    Number?: string;
    Cover?: {
      url?: string;
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
  // v5 болон flat бүтцийг мөн Cover дотор нь нэгтгэж өгсөн
  Title?: string;
  Year?: string | number;
  Number?: string;
  Cover?: {
    url?: string;
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
}

export interface Partner {
  partnerName: string;
  partnerUrl?: string;
  partnerLogo?: StrapiMedia; // Media өгөгдөл
}

export interface InformationSection {
  sectionTitle: string;
  sectionDescription?: string;
  sectionLogo?: StrapiMedia;
}


export interface Article {
  id: number;
  documentId: string;
  title: string;
  authors: string;
  summary?: string;
  key?: string;
  pageCount?: string;
  views: number; // 'Views' байсныг 'views' болгож засаарай
  pdfUrl: string | null;
}

interface StrapiResponseItem {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: any; 
  documentId?: string;
}

export interface Issue {
  id: number;
  documentId: string;
  title: string;
  year: number;
  number: string;
  coverUrl: string | null;
  articles?: Article[];
}

// Strapi-аас ирдэг түүхий өгөгдлийн бүтэц
interface StrapiRawItem {
  id: number;
  documentId: string;
  attributes?: StrapiAttributes;
}

interface StrapiMedia {
  data?: {
    attributes?: {
      url: string;
    };
  };
  url?: string;
}

interface StrapiAttributes {
  Title?: string;
  title?: string;
  Authors?: string;
  authors?: string;
  Summary?: string;
  summary?: string;
  key:string;
  Key:string;
  PageCount?: string;
  pages?: string;
  id: number;
  pageCount: number;
  documentId: string;
  Views?: number;
  views?: number;
  PDFUrl?: {
  data?: {
    attributes?: {
      url: string;
    };
  };
  url?: string;
};
  niitleluud?: {
    data: StrapiRawItem[];
  };
}






const getFullUrl = (url: string | undefined | null) => {
  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};

// --- Функцуудыг export хийх ---

// 1. Сэтгүүлийн мэдээлэл (About хуудсанд)
export async function getJournalInfo() {
  try {
    // 1. 'partners' болон түүний доторх 'partnerLogo'-г гүн рүү нь populate хийнэ
    const query = 'populate[partners][populate][partnerLogo]=*&populate[informationSections][populate][sectionLogo]=*';
    
    const res = await fetch(`${STRAPI_URL}/api/journal-infos?${query}`, { 
      cache: 'no-store' 
    });
    
    const json = await res.json();
    const data = json.data?.[0];

    if (!data) return null;

    // 2. Өгөгдлийг цэвэрхэн болгож хувиргах (Mapping)
    const attr = data.attributes || data;

    return {
      ...attr,
      partners: attr.partners?.map((p: Partner) => ({
        ...p,
        // Зургийн URL-ийг зөв салгаж авах хэсэг
        partnerLogo: p.partnerLogo?.data?.attributes?.url || p.partnerLogo?.url || null
      })) || [],
      informationSections: attr.informationSections?.map((s: InformationSection) => ({
        ...s,
        sectionLogo: s.sectionLogo?.data?.attributes?.url || s.sectionLogo?.url || null
      })) || []
    };
  } catch (error) {
    console.error("getJournalInfo error:", error);
    return null;
  }
}


// 2. Сүүлийн нийтлэл (Home хуудсанд)
export async function getLatestArticle() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc&pagination[limit]=1`, { cache: 'no-store' });
    const json = await res.json();
    return json.data?.[0] || null;
  } catch {
    return null;
  }
}

// 3. Нийтлэлийг ID-аар авах
export async function getArticleById(id: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles/${id}?populate=*`, { cache: 'no-store' });
    const json = await res.json();
    return json.data || null;
  } catch {
  return null;
}
}

// 4. Зөвлөлийн гишүүд
export async function getEditorialMembers() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/editorial-members?populate=*&sort=order:asc`, { 
      cache: 'no-store' 
    });
    const json = await res.json();
    
    // Энд (item: any) биш (item: StrapiResponseItem) гэж бичвэл Ln 57-ын алдаа арилна
    return json.data.map((item: StrapiResponseItem) => ({
      id: item.id,
      name: item.attributes?.name || '',
      position: item.attributes?.position || '',
      affiliation: item.attributes?.affiliation || '',
      bio: item.attributes?.bio || '',
      photo: item.attributes?.photo?.data?.attributes?.url 
        ? `${STRAPI_URL}${item.attributes.photo.data.attributes.url}` 
        : null,
    }));
  } catch (error) { // Ln 31, 40, 49, 66-ын алдааг засахын тулд error-оо ашиглана
    console.error("Editorial fetch error:", error);
    return [];
  }
}

// src/lib/strapi.ts

// src/lib/strapi.ts

// src/lib/strapi.ts

// src/lib/strapi.ts

export async function getIssues(page: number = 1, pageSize: number = 20, year?: number) {
  try {
    // 1. URL-ийн параметрүүдийг бэлдэх
    const params = new URLSearchParams({
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
      'populate[Cover]': '*',
      'sort[0]': 'Year:desc',
      'sort[1]': 'Number:desc',
    });

    // 2. Хэрэв year (он) сонгогдсон бол Strapi шүүлтүүрийг нэмэх
    if (year) {
      params.append('filters[Year][$eq]', year.toString());
    }

    const res = await fetch(`${STRAPI_URL}/api/issues?${params.toString()}`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) return { issues: [], pagination: null };

    const json = await res.json();

    // 3. Өгөгдлийг хөрвүүлэх (Mapping)
    const issues = json.data.map((item: StrapiIssue) => {
      // Strapi v4 болон v5-ийн ялгааг тооцоолж attributes-ийг авах
      const attr = item.attributes || item; 

      return {
        id: item.id,
        documentId: item.documentId || item.id?.toString(),
        title: attr.Title || "Гарчиггүй",
        year: Number(attr.Year || 0),
        number: attr.Number || "0",
        // Зургийн URL-ийг бүтэн болгох
        coverUrl: getFullUrl(attr.Cover?.url || attr.Cover?.data?.attributes?.url),
      };
    });

    return { 
      issues, 
      pagination: json.meta.pagination 
    };
  } catch (error) {
    console.error("getIssues error:", error);
    return { issues: [], pagination: null };
  }
}






// src/lib/strapi.ts

// getIssueById функц доторх fetch хаяг болон mapping хэсэг:

export async function getIssueById(id: string) {
  try {
    // 1. populate[niitleluud][populate]=* гэж бичсэнээр нийтлэл бүрийн PDF, Зураг зэргийг цуг авна
    // Хүсэлтийн URL яг ийм байх ёстой
const url = `${STRAPI_URL}/api/issues/${id}?populate[niitleluud][populate]=*&populate[Cover]=*`;

    
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error("Fetch error:", res.status);
      return null;
    }

    const json = await res.json();
    const data = json.data;

    if (!data) return null;

    // Strapi v4/v5 бүтцийн ялгааг арилгах
    const attr = data.attributes || data;

    // Нийтлэлүүдийг авах (niitleluud талбараас)
    const rawArticles = attr.niitleluud?.data || attr.niitleluud || [];

    return {
      id: data.id,
      documentId: data.documentId || data.id.toString(),
      title: attr.Title || attr.title || "Гарчиггүй",
      year: attr.Year || attr.year,
      number: attr.Number || attr.number,
      coverUrl: getFullUrl(attr.Cover?.url || attr.Cover?.data?.attributes?.url),
      
      // Нийтлэлүүдийг mapping хийх хэсэг
      articles: Array.isArray(rawArticles) ? rawArticles.map((art: StrapiRawItem) => {
          const a = (art.attributes || art) as StrapiAttributes;
        return {
          id: art.id,
          documentId: art.documentId || art.id.toString(),
          title: a.title || "Гарчиггүй",
          authors: a.Authors || "Зохиогч байхгүй",
          summary: a.summary || "",
          key: a.key || "",
          views: a.views || 0,
          pageCount: a.pages || a.PageCount || "0",
          // PDF файлыг media талбараас авах
          pdfUrl: getFullUrl(a.PDFUrl?.url || a.PDFUrl?.data?.attributes?.url)
          
        };
      }) : []
    };
  } catch (error) {
    console.error("getIssueById error:", error);
    return null;
  }
}


// src/lib/strapi.ts

export async function updateArticleViews(documentId: string, currentViews: number) {
  try {
    const url = `${STRAPI_URL}/api/articles/${documentId}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        data: { 
          views: currentViews + 1 // Энд заавал том 'Views' байх ёстой
        } 
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("Update error:", error);
    return false;
  }
}


// 5. Хамгийн сүүлийн дугаарыг (Issue) авах
export async function getLatestIssue(): Promise<Issue | null> {
  try {
    // Year болон Number-ээр нь эрэмбэлж, хамгийн эхний 1-ийг авна
    const query = `populate[Cover]=*&sort[0]=Year:desc&sort[1]=Number:desc&pagination[limit]=1`;
    const res = await fetch(`${STRAPI_URL}/api/issues?${query}`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) return null;
    const json = await res.json();
    
    if (!json.data || json.data.length === 0) return null;

    const item = json.data[0];
    const attr = item.attributes || item;

    return {
      id: item.id,
      documentId: item.documentId || item.id?.toString(),
      title: attr.Title || attr.title || "Гарчиггүй",
      year: attr.Year || attr.year || 0,
      number: attr.Number || attr.number || "0",
      coverUrl: getFullUrl(attr.Cover?.data?.attributes?.url || attr.Cover?.url),
    };
  } catch (error) {
    console.error("getLatestIssue error:", error);
    return null;
  }
}







// src/app/archive/page.tsx (эсвэл таны lib/strapi.ts доторх функц)

export async function getAuthorsInfo() {
  try {
    // Strapi дээр 'authors-info' нэртэй Single Type үүсгэсэн гэж үзвэл:
    const res = await fetch(`${STRAPI_URL}/api/authors-info?populate=*`, { 
      cache: 'no-store' 
    });
    const json = await res.json();
    return json.data?.attributes || json.data || null;
  } catch (error) {
    console.error("getAuthorsInfo error:", error);
    return null;
  }
}

export async function getInformationPage() {
  try {
    // Collection Type учраас 'information-pages' (олон тоон дээр) гэж дуудна
    const res = await fetch(`${STRAPI_URL}/api/information-pages?populate=*`, { 
      cache: 'no-store' 
    });

    if (!res.ok) {
      console.error("Strapi fetch failed:", res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    
    // Collection Type учраас өгөгдөл нь жагсаалт (Array) дотор ирнэ. 
    // Тиймээс эхний элементийг (index 0) салгаж авна.
    const item = json.data?.[0]; 
    return item?.attributes || item || null;
    
  } catch (error) {
    console.error("getInformationPage error:", error);
    return null;
  }
}

// lib/strapi.ts
// lib/strapi.ts
// lib/strapi.ts
export async function getArticleByDocumentId(id: string) {
  // URL байгаа эсэхийг шалгах, байхгүй бол шууд localhost ашиглах
  const baseUrl = process.env.STRAPI_API_URL || 'https://jpa.naog.edu.mn';
  
  const res = await fetch(
    `${baseUrl}/api/articles/${id}?populate=*`, 
    { cache: 'no-store' }
  );

  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

// src/lib/strapi.ts












