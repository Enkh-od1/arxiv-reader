// page.tsx дотор
import ForAuthorsClient from './ForAuthorsClient'; // Файлын байршил зөв эсэхийг шалгаарай

export default async function Page() {
  // const data = await getInformationPage(); <-- Энэ хэрэггүй болсон

  return (
    <main>
      <ForAuthorsClient />  {/* initialData={data} гэдгийг устгасан */}
    </main>
  );
}
