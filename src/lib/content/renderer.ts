/* src/lib/content/renderer.ts */
export interface SlideFragment {
  markdown: string;
  kind: "plain" | "bg" | "split" | "split-reverse";
  imageUrl?: string;
  objectPosition?: string;
}

/**
 * Splits markdown into slides and parses scrollytelling directives.
 */
export function splitMarkdownIntoSlides(content: string): SlideFragment[] {
  // AUDIT FIX: Supports both Windows and Linux line endings for slide separation.
  const rawFragments = content.split(/\r?\n---\r?\n/);

  return rawFragments.map((fragment): SlideFragment => {
    const trimmed = fragment.trim();
    
    // AUDIT FIX: Refined regex to handle leading whitespace and complex positions like '50% 65%'.
    const directiveMatch = trimmed.match(/^\s*!\[(bg|split|split-reverse)(?:\s+([^\]]+))?\]\(([^)]+)\)/);

    if (directiveMatch) {
      const [fullMatch, kind, position, url] = directiveMatch;
      return {
        // Remove only the specific directive phrasing from the output markdown.
        markdown: trimmed.replace(fullMatch, "").trim(),
        kind: kind as SlideFragment["kind"],
        imageUrl: url,
        objectPosition: position?.trim() || "center",
      };
    }

    return {
      markdown: trimmed,
      kind: "plain",
    };
  });
}