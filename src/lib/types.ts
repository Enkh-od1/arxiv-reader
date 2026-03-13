// lib/types.ts (эсвэл page.tsx дотор)
export interface Partner {
  partnerName: string;
  partnerLogo?: string;
  partnerUrl?: string;
}

export interface InfoSection {
  sectionTitle: string;
  sectionLogo?: string;
  sectionDescription?: string;
}

export interface JournalInfo {
  journalName?: string;
  journalLogoUrl?: string;
  focusAndScope?: string;
  issn?: string;
  eissn?: string;
  aboutText?: string;
  partners?: Partner[];
  informationSections?: InfoSection[];
  
  // Эндээс нэмж байна (алдаа засах гол хэсэг)
}

