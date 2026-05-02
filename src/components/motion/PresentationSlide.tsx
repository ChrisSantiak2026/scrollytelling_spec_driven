/* src/components/motion/PresentationSlide.tsx */
"use client";
import { useRef } from "react";
import Image from "next/image"; // AUDIT FIX: Use Next.js Image component.
import { useScroll } from "framer-motion";
import { SlideContext } from "./SlideContext";
import styles from "./PresentationSlide.module.css";

interface SlideProps {
  children: React.ReactNode;
  index: number;
  kind?: "plain" | "bg" | "split" | "split-reverse";
  imageUrl?: string;
}

export function PresentationSlide({ children, index, kind = "plain", imageUrl }: SlideProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  return (
    <SlideContext.Provider value={{ scrollYProgress }}>
      <section ref={ref} className={styles.slideTrack} style={{ zIndex: index }}>
        <div className={styles.stickyStage}>
          {imageUrl && (kind === "bg" || kind === "split" || kind === "split-reverse") && (
            <div className={`${styles.imageContainer} ${styles[kind]}`}>
              <Image 
                src={imageUrl} 
                alt="" 
                fill 
                className={styles.image} 
                unoptimized // Required for static GitHub Pages export.
              />
            </div>
          )}
          
          <div className={`${styles.content} ${styles[`content--${kind}`]}`}>
            {children}
          </div>
        </div>
      </section>
    </SlideContext.Provider>
  );
}