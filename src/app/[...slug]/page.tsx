/* src/app/[...slug]/page.tsx */
import { getPagesRepo } from "@/lib/content/repository";
import { PageLayoutFactory } from "@/components/layouts/PageLayoutFactory";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPagesRepo().getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}

export default async function DynamicPage({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  
  // AUDIT FIX: Fetch data first outside of the JSX return.
  const page = await getPagesRepo().getPageBySlug(slugPath).catch((e) => {
    console.error(`Failed to load page: ${slugPath}`, e);
    return null;
  });

  if (!page) {
    notFound(); // Triggers 404 for missing content.
  }

  // Pure JSX return outside of the logic block.
  return <PageLayoutFactory page={page} />;
}