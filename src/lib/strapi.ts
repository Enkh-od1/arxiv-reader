const STRAPI_URL = 'http://jpa.naog.edu.mn:1337';

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
  summary: string;
  pageCount: string;
  pdfUrl: string | null;
  Views: number;
  views: number;
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
  PageCount?: string;
  pages?: string;
  Views?: number;
  views?: number;
  pdfUrl?: string; // Энийг заавал нэмээрэй
  PDF?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
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

export async function getIssues(): Promise<Issue[]> {
  try {
    // Талбарын нэр Том үсгээр байгаа тул populate хийхэд Cover-ийг том үсгээр бичнэ
    const res = await fetch(`${STRAPI_URL}/api/issues?populate[Cover]=*&sort=Year:desc`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) return [];

    const json = await res.json();
    if (!json.data) return [];

    return json.data.map((item: StrapiRawItem) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attr = (item.attributes || item) as any;

      return {
        id: item.id,
        documentId: item.documentId || item.id?.toString(),
        title: attr.Title || attr.title || "Гарчиггүй", // Том Title-ийг түрүүлж авна
        year: Number(attr.Year || attr.year || 0),
        number: attr.Number || attr.number || "0",
        coverUrl: getFullUrl(
          attr.Cover?.data?.attributes?.url || 
          attr.Cover?.url ||
          attr.cover?.data?.attributes?.url
        ),
      };
    });
  } catch (error) {
    console.error("getIssues error:", error);
    return [];
  }
}


// src/lib/strapi.ts

// getIssueById функц доторх fetch хаяг болон mapping хэсэг:

export async function getIssueById(id: string): Promise<Issue | null> {
  try {
    // 1. Populate хийхдээ 'articles' болон 'PDF' талбарыг заавал оруулна
    const query = `populate[Cover]=*&populate[niitleluud][populate][PDF]=*&populate[niitleluud][sort]=Order:asc`;
    
    const res = await fetch(`${STRAPI_URL}/api/issues/${id}?${query}`, { cache: 'no-store' });
    
    if (!res.ok) return null;
    const json = await res.json();
    
    // ЭНЭ МӨРИЙГ НЭМЭЭД ТЕРМИНАЛАА ХАРААРАЙ - Өгөгдөл ирж байгаа эсэхийг шалгана
    console.log("DEBUG - Issue Data:", JSON.stringify(json.data, null, 2));

    const data = json.data;
    if (!data) return null;

    const attr = data.attributes || data;

    return {
      id: data.id,
      documentId: data.documentId || data.id?.toString(),
      title: attr.Title || attr.title || "Гарчиггүй",
      year: attr.Year || 0,
      number: attr.Number || "0",
      coverUrl: getFullUrl(attr.Cover?.data?.attributes?.url || attr.Cover?.url),
      
      // Өгүүллүүдийг илүү найдвартай унших хэсэг
      // src/lib/strapi.ts доторх хэсэг

// StrapiRawItem-ийг any болгож солино
// getIssueById функц доторх articles.map хэсэгт:

articles: (attr.niitleluud?.data || attr.niitleluud || []).map((art: StrapiRawItem) => {
  // Энд (art as any) гэж хүчээр зааж өгснөөр улаан зураас арилна
  const a = (art.attributes || art) as StrapiAttributes;

  return {
    id: art.id,
    documentId: art.documentId || art.id?.toString(),
    title: a.Title || a.title || "Гарчиггүй",
    authors: a.Authors || a.authors || "Зохиогч тодорхойгүй",
    summary: a.Summary || a.summary || "Хураангуй байхгүй",
    pageCount: a.PageCount || a.pages || "—",
    views: Number(a.Views || a.views || 0),
    pdfUrl: a.pdfUrl || a.PDF?.data?.attributes?.url || null,
  };
}),





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
          Views: currentViews + 1 // Энд заавал том 'Views' байх ёстой
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



