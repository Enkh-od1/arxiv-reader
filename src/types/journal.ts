// types/journal.ts
export interface JournalInfo {
  focusAndScope?: string;
  issn?: string;
  eissn?: string;
  doiPrefix?: string;               // ← нэмсэн
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;             // ← publishedDate биш publishedAt гэж Strapi-д байдаг
  partners?: Partner[];
  informationSections?: InformationSection[];
}

export interface Partner {
  partnerName?: string;
  partnerUrl?: string;
  partnerLogo?: string;  // Strapi-аас ирж байгаа URL
}

export interface InformationSection {
  id?: number;
  sectionTitle?: string;
  sectionLogo?: string;
  sectionDescription?: string;
}