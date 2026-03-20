import ForAuthorsClient from './ForAuthorsClient';
import { getInformationPage } from '@/lib/strapi';

export default async function Page() {
  const data = await getInformationPage(); // Энд функцээ зөв дуудсан эсэх
  return <ForAuthorsClient initialData={data} />;
}