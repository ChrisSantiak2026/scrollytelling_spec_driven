/* src/components/ui/Heading.tsx */
import React from "react";
import styles from "./Heading.module.css";

export interface HeadingProps {
  level: 1 | 2 | 3 | 4;
  children?: React.ReactNode;
  className?: string;
}

/* src/components/ui/Heading.tsx */
export function Heading({ level, children, className = "" }: HeadingProps) {
  // AUDIT FIX: Explicitly cast to ElementType to satisfy the JSX parser
  const Tag = `h${level}` as React.ElementType;
  return <Tag className={`${styles[`h${level}`]} ${className}`}>{children}</Tag>;
}

/* src/components/motion/LayeredRevealGroup.tsx */
interface LayeredRevealProps {
  children: React.ReactNode;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}