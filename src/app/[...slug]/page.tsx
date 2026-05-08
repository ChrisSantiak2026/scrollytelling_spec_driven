/* src/app/[...slug]/page.tsx */
import { getPagesRepo } from "@/lib/content/repository";
import { PageLayoutFactory } from "@/components/layouts/PageLayoutFactory";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const repo = getPagesRepo();
  const slugs = await repo.getAllSlugs();
  
  // AUDIT FIX: Ensure slug is always an array for catch-all routes.
  return slugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}

/* Corrected Logic for src/app/[...slug]/page.tsx */
export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  
  // Fetch data first
  const page = await getPagesRepo().getPageBySlug(slugPath).catch(() => null);

  if (!page) {
    notFound(); // Triggers 404 outside of try/catch
  }

  return <PageLayoutFactory page={page} />;
}