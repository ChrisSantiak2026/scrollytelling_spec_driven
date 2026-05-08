/* src/app/page.tsx */
import { getHomeRepo } from "@/lib/content/repository";
import { PageLayoutFactory } from "@/components/layouts/PageLayoutFactory";
import { notFound } from "next/navigation";

export default async function HomePage() {
  // Fetch data outside the render return
  const page = await getHomeRepo().getPageBySlug("home").catch(() => null);

  if (!page) {
    notFound(); // Triggers the standard Next.js 404
  }

  return <PageLayoutFactory page={page} />;
}