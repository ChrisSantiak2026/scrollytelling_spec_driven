import { splitMarkdownIntoSlides } from "@/lib/content/parser";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { PresentationSlide } from "@/components/motion/PresentationSlide";
import { PresentationProgress } from "@/components/motion/PresentationProgress";
import { PresentationShortcuts } from "@/components/motion/PresentationShortcuts";
import type { PageData } from "@/lib/content/repository";
import styles from "./PresentationLayout.module.css";

export function PresentationLayout({ page }: { page: PageData }) {
  const slides = splitMarkdownIntoSlides(page.content);

  return (
    <div className={styles.root}>
      <PresentationProgress />
      <PresentationShortcuts />
      
      {slides.map((slide, i) => (
        <PresentationSlide 
          key={i} 
          index={i} 
          kind={slide.kind} 
          imageUrl={slide.imageUrl}
        >
          <MarkdownRenderer source={slide.markdown} />
        </PresentationSlide>
      ))}
      
      {/* Footer Gate: Final Narrative Anchor */}
      <footer className={styles.footerGate}>
        <p className={styles.metadata}>END_OF_BRIEFING // TECHNICAL ARCHIVE</p>
      </footer>
    </div>
  );
}