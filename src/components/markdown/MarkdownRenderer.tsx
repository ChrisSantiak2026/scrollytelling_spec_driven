/* src/components/markdown/MarkdownRenderer.tsx */
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { StatGrid } from "@/components/visualization/StatGrid";
import { ScrollDemo } from "@/components/visualization/ScrollDemo";
import styles from "./MarkdownRenderer.module.css";

interface MDXProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const components = {
  h1: (props: MDXProps) => <Reveal direction="none"><Heading level={1} {...props} /></Reveal>,
  h2: (props: MDXProps) => <Reveal direction="up"><Heading level={2} {...props} /></Reveal>,
  
  // AUDIT FIX: Catch rogue images and apply responsive constraints
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <div className={styles.imageWrapper}>
      <img 
        src={src} 
        alt={alt} 
        className={styles.responsiveImage} 
        loading="lazy" 
      />
    </div>
  ),

  p: (props: MDXProps) => <p className={styles.paragraph} {...props} />,
  ul: (props: MDXProps) => <ul className={styles.list} {...props} />,
  li: (props: MDXProps) => <li className={styles.listItem} {...props} />,
  a: (props: MDXProps) => <a className={styles.link} {...props} />,
  hr: () => <hr className={styles.rule} />,
  
  pre: ({ children }: MDXProps) => <>{children}</>, 
  code: ({ className, children }: MDXProps) => {
    const lang = className?.replace("language-", "");
    const source = String(children || "").trim();
    switch (lang) {
      case "stat-grid": return <StatGrid source={source} />;
      case "scroll-demo": return <ScrollDemo source={source} />;
      default: return <code className={className}>{children}</code>;
    }
  },
};

export function MarkdownRenderer({ source }: { source: string }) {
  return (
    <MDXRemote 
      source={source} 
      components={components} 
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} 
    />
  );
}