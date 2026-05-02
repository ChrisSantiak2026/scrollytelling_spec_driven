import { StandardLayout } from "./StandardLayout";
import { PresentationLayout } from "./PresentationLayout"; // Import the real layout
import type { PageData } from "@/lib/content/repository";

export function PageLayoutFactory({ page }: { page: PageData }) {
  switch (page.frontmatter.layout) {
    case "presentation":
      return <PresentationLayout page={page} />;
    case "standard":
    default:
      return <StandardLayout page={page} />;
  }
}