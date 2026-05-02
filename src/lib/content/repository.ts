import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { PageFrontmatterSchema, type PageFrontmatter } from "./schema";

export interface PageData {
  slug: string;
  frontmatter: PageFrontmatter;
  content: string;
}

export class ContentRepository {
  private baseDir: string;

  constructor(baseDir: string) {
    this.baseDir = path.join(process.cwd(), baseDir);
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
const pagesRepo = new ContentRepository("content/pages");
const homeRepo = new ContentRepository("content");

export function getPagesRepo() { return pagesRepo; }
export function getHomeRepo() { return homeRepo; }