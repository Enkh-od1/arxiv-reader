import { NextResponse } from 'next/server';

export async function GET(
  _request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. URL-ийг бүтнээр нь порттой нь (1337), uploads хавтастай нь бичнэ
    // 2. Хашилтыг ( ` ) ашиглаж, id-ийн өмнө $ тэмдэг заавал тавина
    const pdfUrl = `http://jpa.naog.edu.mn${id}.pdf`; 

    const response = await fetch(pdfUrl);

    if (!response.ok) {
      return new NextResponse("Файл олдсонгүй", { status: 404 });
    }

    const blob = await response.blob();

    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline', 
      },
    });
  } catch (err) {
    console.error("PDF View Error:", err);
    return new NextResponse("Серверийн алдаа", { status: 500 });
  }
}
