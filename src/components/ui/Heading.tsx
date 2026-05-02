/* src/components/ui/Heading.tsx */
import React from "react";
import styles from "./Heading.module.css";

export interface HeadingProps {
  level: 1 | 2 | 3 | 4;
  children?: React.ReactNode;
  className?: string;
}

export function Heading({ level, children, className = "" }: HeadingProps) {
  // AUDIT FIX: Explicitly cast to React.ElementType
  const Tag = `h${level}` as React.ElementType;
  
  return (
    <Tag className={`${styles[`h${level}`]} ${className}`}>
      {children}
    </Tag>
  );
}