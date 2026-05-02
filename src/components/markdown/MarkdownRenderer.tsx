import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { StatGrid } from "@/components/visualization/StatGrid";
import { ScrollDemo } from "@/components/visualization/ScrollDemo";

/**
 * AUDIT FIX: Explicit interface to resolve 'Unexpected any' linting errors.
 * This ensures the MDX component map is strictly typed for React 19.
 */
interface MDXProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const components = {
  h1: (props: MDXProps) => <Reveal direction="none"><Heading level={1} {...props} /></Reveal>,
  h2: (props: MDXProps) => <Reveal direction="up"><Heading level={2} {...props} /></Reveal>,
  // ... other components
  // Code-block dispatcher for visualizations
  pre: ({ children }: MDXProps) => <>{children}</>, 
  code: ({ className, children }: MDXProps) => {
    const lang = className?.replace("language-", "");
    const source = String(children || "").trim();

    switch (lang) {
      case "stat-grid":
        return <StatGrid source={source} />;
      case "scroll-demo":
        return <ScrollDemo source={source} />;
      default:
        return <code className={className}>{children}</code>;
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