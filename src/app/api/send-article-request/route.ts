import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const surname = formData.get('surname') as string || 'Байхгүй';
    const name = formData.get('name') as string || 'Байхгүй';
    const email = formData.get('email') as string || 'Байхгүй';
    const title = formData.get('title') as string || 'Гарчиггүй';
    const summary = formData.get('summary') as string || 'Танилцуулга байхгүй';
    const additional = formData.get('additional') as string || 'Нэмэлт тайлбар байхгүй';
    const file = formData.get('file') as File | null;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"arXiv Explorer" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `Шинэ хүсэлт: ${title}`,
      text: `
Овог нэр: ${surname} ${name}
Имэйл: ${email}
Гарчиг: ${title}
Товч танилцуулга:
${summary}

Нэмэлт тайлбар:
${additional}
      `,
      attachments: file
        ? [{
            filename: file.name,
            content: Buffer.from(await file.arrayBuffer()),
          }]
        : undefined,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Имэйл илгээх алдаа:', error);
    return NextResponse.json(
      { success: false, message: 'Илгээхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}