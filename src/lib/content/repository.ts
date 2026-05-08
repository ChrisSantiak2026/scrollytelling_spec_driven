/* src/lib/content/repository.ts */
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { PageFrontmatterSchema, type PageFrontmatter } from "./schema";

/**
 * Data interface for all site content.
 * Exported locally to resolve schema/repository circular dependencies.
 */
export interface PageData {
  slug: string;
  frontmatter: PageFrontmatter;
  content: string;
}

export class ContentRepository {
  private baseDir: string;

  constructor(baseDir: string) {
    /** * AUDIT FIX: Use path.resolve to prevent path-doubling in Linux runners.
     * Ensures the repository can find content/ files during static export.
     */
    this.baseDir = path.resolve(process.cwd(), baseDir);
  }

  async getPageBySlug(slug: string): Promise<PageData> {
    const filePath = path.join(this.baseDir, `${slug}.md`);
    const fileContent = await fs.readFile(filePath, "utf8");
    
    /** * AUDIT FIX: matter() splits the YAML frontmatter (data) from the body (content).
     * This prevents frontmatter keys like 'title' or 'layout' from leaking into the body text.
     */
    const { data, content } = matter(fileContent);
    const frontmatter = PageFrontmatterSchema.parse(data);
    
    // Return only the narrative content for rendering
    return { slug, frontmatter, content };
  }

  async getAllSlugs(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.baseDir);
      return files
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(".md", ""));
    } catch (e) {
      console.warn(`Repository base directory not found: ${this.baseDir}`);
      return [];
    }
  }
}

// SPEC-COMPLIANT SINGLETONS
const pagesRepo = new ContentRepository("content/pages");
const homeRepo = new ContentRepository("content");

export function getPagesRepo() { return pagesRepo; }
export function getHomeRepo() { return homeRepo; }