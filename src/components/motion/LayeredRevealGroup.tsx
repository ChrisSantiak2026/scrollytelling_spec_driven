/* src/components/motion/LayeredRevealGroup.tsx */
import React from "react";
import { Reveal } from "./Reveal";

interface LayeredRevealProps {
  children: React.ReactNode;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function LayeredRevealGroup({
  children,
  stagger = 0.08,
  direction = "up",
  className = ""
}: LayeredRevealProps) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div className={className}>
      {items.map((child, i) => (
        <Reveal key={i} delay={i * stagger} direction={direction}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}