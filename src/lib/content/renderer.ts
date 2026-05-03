/* src/lib/content/renderer.ts */
export interface SlideFragment {
  markdown: string;
  kind: "plain" | "bg" | "split" | "split-reverse";
  imageUrl?: string;
  objectPosition?: string;
}

export function splitMarkdownIntoSlides(content: string): SlideFragment[] {
  // AUDIT FIX: Support both Windows and Linux line endings for the slide separator.
  const rawFragments = content.split(/\r?\n---\r?\n/);

  return rawFragments.map((fragment): SlideFragment => {
    const trimmed = fragment.trim();
    
    /**
     * AUDIT FIX: Refined regex to allow for leading whitespace and flexible position capture.
     * Captures: ![kind position](url)
     */
    const directiveMatch = trimmed.match(/^!\[(bg|split|split-reverse)(?:\s+([^\]]+))?\]\(([^)]+)\)/);

    if (directiveMatch) {
      const [fullMatch, kind, position, url] = directiveMatch;
      return {
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