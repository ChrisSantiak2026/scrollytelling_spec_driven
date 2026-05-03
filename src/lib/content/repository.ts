/* src/lib/content/repository.ts */
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
// AUDIT FIX: PageData is now defined locally to resolve the 'no exported member' error.
import { PageFrontmatterSchema, type PageFrontmatter } from "./schema";

export interface PageData {
  slug: string;
  frontmatter: PageFrontmatter;
  content: string;
}

export class ContentRepository {
  private baseDir: string;

  constructor(baseDir: string) {
    /** * AUDIT FIX: Use path.resolve instead of path.join. 
     * path.resolve correctly treats baseDir as an absolute path if it starts with '/', 
     * preventing the ENOENT error in CI environments.
     */
    this.baseDir = path.resolve(process.cwd(), baseDir);
  }

  async getPageBySlug(slug: string): Promise<PageData> {
    const filePath = path.join(this.baseDir, `${slug}.md`);
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const frontmatter = PageFrontmatterSchema.parse(data);
    return { slug, frontmatter, content };
  }

  async getAllSlugs(): Promise<string[]> {
    const files = await fs.readdir(this.baseDir);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(".md", ""));
  }
}

// SPEC-COMPLIANT SINGLETONS
export const getPagesRepo = () => new ContentRepository("content/pages");
export const getHomeRepo = () => new ContentRepository("content");