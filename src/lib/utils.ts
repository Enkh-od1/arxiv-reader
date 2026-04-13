export interface Issue {
  id: number;
  publishedDate: string; // эсвэл Date
  title: string;
  // бусад талбарууд...
}

export const groupByYear = (issues: Issue[]) => {
  return issues.reduce((acc, issue) => {
    // publishedDate-ээс оныг нь салгаж авах (жишээ нь: "2025-01-01")
    const year = new Date(issue.publishedDate).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(issue);
    return acc;
  }, {} as Record<number, Issue[]>);
};