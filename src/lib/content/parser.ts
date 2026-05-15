/* src/lib/content/parser.ts */

export interface ParsedSlide {
  markdown: string;
  kind: "plain" | "bg" | "split" | "split-reverse";
  imageUrl?: string;
  objectPosition?: string;
}

/**
 * Splits markdown into slides based on horizontal rules.
 */
export function splitMarkdownIntoSlides(content: string): ParsedSlide[] {
  // Handles both Windows (\r\n) and Linux (\n) line endings.
  const rawFragments = content.split(/\r?\n---\r?\n/);

  return rawFragments.map((fragment): ParsedSlide => {
    const trimmed = fragment.trim();
    
    /** * AUDIT FIX: Removed the '^' anchor.
     * This allows the directive to be detected even if there is a title above it.
     * Captures: ![kind position](url)
     */
    const directiveRegex = /!\[(bg|split|split-reverse)(?:\s+([^\]]+))?\]\(([^)]+)\)/;
    const match = trimmed.match(directiveRegex);

    if (match) {
      const [fullMatch, kind, position, url] = match;
      return {
        /**
         * AUDIT FIX: We strip the directive from the markdown string.
         * This ensures the image is handled by our PresentationLayout and not re-rendered 
         * as a giant 'plain' image by the MarkdownRenderer.
         */
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