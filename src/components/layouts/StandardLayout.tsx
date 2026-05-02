import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import type { PageData } from "@/lib/content/repository";
import styles from "./StandardLayout.module.css";

export function StandardLayout({ page }: { page: PageData }) {
  return (
    <main className={styles.root}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.metadata}>TECHNICAL_SPEC // {page.slug.toUpperCase()}</p>
          <h1 className={styles.title}>{page.frontmatter.title}</h1>
          {page.frontmatter.summary && <p className={styles.summary}>{page.frontmatter.summary}</p>}
        </div>
      </header>
      
      <article className={styles.content}>
        <div className={styles.container}>
          <MarkdownRenderer source={page.content} />
        </div>
      </article>
    </main>
  );
}