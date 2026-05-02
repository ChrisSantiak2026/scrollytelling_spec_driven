export type SlideKind = "plain" | "bg" | "split" | "split-reverse";

export interface ParsedSlide {
  kind: SlideKind;
  imageUrl?: string;
  markdown: string;
}

export function splitMarkdownIntoSlides(body: string): ParsedSlide[] {
  // Split by the horizontal rule separator
  const rawSlides = body.split(/\n---\n/);

  return rawSlides.map((raw) => {
    let kind: SlideKind = "plain";
    let imageUrl: string | undefined;

    // Detect image directives like ![bg](/path) or ![split](/path)
    const imageMatch = raw.match(/!\[(bg|split|split-reverse)\]\((.*?)\)/);
    
    if (imageMatch) {
      /* AUDIT FIX: Destructure the match array to extract 
         the captured strings instead of the whole object.
      */
      const [, capturedKind, capturedUrl] = imageMatch;
      kind = capturedKind as SlideKind;
      imageUrl = capturedUrl;
    }

    // Remove the directive from the final markdown text
    const markdown = raw.replace(/!\[(bg|split|split-reverse)\]\(.*?\)/, "").trim();

    return { kind, imageUrl, markdown };
  });
} 
