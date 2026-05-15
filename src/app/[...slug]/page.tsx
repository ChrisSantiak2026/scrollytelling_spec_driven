/* src/app/[...slug]/page.tsx */
import { getPagesRepo } from "@/lib/content/repository";
import { PageLayoutFactory } from "@/components/layouts/PageLayoutFactory";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPagesRepo().getAllSlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  
  // AUDIT FIX: Construct logic outside the return statement
  const page = await getPagesRepo().getPageBySlug(slugPath).catch(() => null);

  if (!page) {
    notFound(); // Clean 404 for missing technical specs
  }

  return <PageLayoutFactory page={page} />;
}