/* src/app/page.tsx */
import { getHomeRepo } from "@/lib/content/repository";
import { PageLayoutFactory } from "@/components/layouts/PageLayoutFactory";
import { notFound } from "next/navigation";

export default async function HomePage() {
  // Fetch data first - this is the part that can fail
  const page = await getHomeRepo().getPageBySlug("home").catch(() => null);

  // If page is null, trigger the standard Next.js 404
  if (!page) {
    notFound();
  }

  // Construct JSX outside of any logic blocks
  return <PageLayoutFactory page={page} />;
}