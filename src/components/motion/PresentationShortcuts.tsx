"use client";
import { useEffect } from "react";

export function PresentationShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Professional navigation triggers
      const isNext = e.key === "ArrowDown" || e.key === "j" || e.key === " ";
      const isPrev = e.key === "ArrowUp" || e.key === "k";

      if (isNext || isPrev) {
        e.preventDefault();
        const slides = document.querySelectorAll('section[class*="slideTrack"]');
        const currentScroll = window.scrollY;
        
        let target: Element | null = null;

        for (const slide of Array.from(slides)) {
          const rect = slide.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          
          if (isNext && top > currentScroll + 10) {
            target = slide;
            break;
          }
          if (isPrev && top < currentScroll - 10) {
            target = slide;
          }
        }

        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null; // This is a logic-only 'agent' component.
}