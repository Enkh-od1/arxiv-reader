// app/api/search/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface ArXivAuthor {
  name: string[];
}

interface ArXivLink {
  $: {
    href: string;
    title?: string;
  };
}

interface ArXivEntry {
  id: string[];
  title: string[];
  summary: string[];
  published: string[];
  author?: ArXivAuthor | ArXivAuthor[];
  link: ArXivLink[];
}

interface ArXivFeed {
  feed: {
    entry?: ArXivEntry | ArXivEntry[];
    'opensearch:totalResults'?: string[];
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let query = searchParams.get('query') || '';
  const start = parseInt(searchParams.get('start') || '0', 10);
  const maxResults = parseInt(searchParams.get('maxResults') || '10', 10);

  // Хэрэв query хоосон бол default
  if (!query.trim()) {
    query = 'all:electron';
  }

  // Query-г зөв болгох (space-аар тусгаарлах)
  const encodedQuery = encodeURIComponent(query.trim());

  const apiUrl = `http://export.arxiv.org/api/query?search_query=${encodedQuery}&start=${start}&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;

  try {
    const response = await axios.get(apiUrl, { timeout: 10000 });
    const xmlData = response.data;
    const parsedData: ArXivFeed = await parseStringPromise(xmlData);

    const entries = Array.isArray(parsedData.feed.entry)
      ? parsedData.feed.entry
      : parsedData.feed.entry ? [parsedData.feed.entry] : [];

    const papers = entries.map((entry: ArXivEntry) => {
      const authors = Array.isArray(entry.author)
        ? entry.author.map((a) => a.name[0])
        : entry.author ? [entry.author.name[0]] : ['Нэргүй'];

      const pdfLink = entry.link.find((l) => l.$.title === 'pdf');

      const id = entry.id[0]
        .replace('http://arxiv.org/abs/', '')
        .replace('https://arxiv.org/abs/', '');

      return {
        id,
        title: entry.title[0]?.trim() || 'Гарчиггүй',
        summary: entry.summary[0]?.trim() || 'Хураангуй байхгүй',
        authors,
        published: entry.published[0],
        pdfUrl: pdfLink?.$.href || `https://arxiv.org/pdf/${id}.pdf`,
      };
    });

    const total = parseInt(parsedData.feed['opensearch:totalResults']?.[0] || '0', 10);

    return NextResponse.json({ papers, total });
  } catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error('arXiv API алдаа:', errorMessage);

  return NextResponse.json(
    { error: 'Өгүүлэл татахад алдаа гарлаа', details: errorMessage },
    { status: 500 }
  );
}
}