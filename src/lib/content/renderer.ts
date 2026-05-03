/* src/lib/content/renderer.ts */
import { PageData } from "./repository";

export interface SlideFragment {
  markdown: string;
  kind: "plain" | "bg" | "split" | "split-reverse";
  imageUrl?: string;
  objectPosition?: string;
}

/**
 * Splits a raw markdown string into individual slide objects.
 * Captures directives like ![bg 50% 20%](/img.png) at the start of slides.
 */
export function splitMarkdownIntoSlides(content: string): SlideFragment[] {
  // Split by the horizontal rule separator
  const rawFragments = content.split(/\n---\n/);

  return rawFragments.map((fragment): SlideFragment => {
    const trimmed = fragment.trim();
    
    // REGEX: Matches ![kind position](url) at the very start of the slide.
    const directiveMatch = trimmed.match(/^!\[(bg|split|split-reverse)(?:\s+([^\]]+))?\]\(([^)]+)\)/);

    if (directiveMatch) {
      const [fullMatch, kind, position, url] = directiveMatch;
      return {
        // Remove the directive from the markdown text to prevent double-rendering
        markdown: trimmed.replace(fullMatch, "").trim(),
        kind: kind as SlideFragment["kind"],
        imageUrl: url,
        objectPosition: position || "center",
      };
    }

    return {
      markdown: trimmed,
      kind: "plain",
    };
  });
}