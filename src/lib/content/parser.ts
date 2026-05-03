/* src/lib/content/parser.ts */

/**
 * AUDIT FIX: Explicitly defined 'objectPosition' to resolve Vitest type errors.
 */
export interface ParsedSlide {
  markdown: string;
  kind: "plain" | "bg" | "split" | "split-reverse";
  imageUrl?: string;
  objectPosition?: string; // This was the missing property
}

/**
 * Splits markdown into slides based on horizontal rules.
 */
export function splitMarkdownIntoSlides(content: string): ParsedSlide[] {
  // Handles both Windows and Linux line endings
  const rawFragments = content.split(/\r?\n---\r?\n/);

  return rawFragments.map((fragment): ParsedSlide => {
    const trimmed = fragment.trim();
    
    // Captures: ![kind position](url)
    const directiveMatch = trimmed.match(/^\s*!\[(bg|split|split-reverse)(?:\s+([^\]]+))?\]\(([^)]+)\)/);

    if (directiveMatch) {
      const [fullMatch, kind, position, url] = directiveMatch;
      return {
        markdown: trimmed.replace(fullMatch, "").trim(),
        kind: kind as ParsedSlide["kind"],
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