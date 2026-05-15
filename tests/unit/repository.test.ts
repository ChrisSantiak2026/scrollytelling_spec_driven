/* tests/unit/repository.test.ts */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { ContentRepository } from "../../src/lib/content/repository";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

describe("ContentRepository", () => {
  let tempDir: string;
  let repo: ContentRepository;

/* tests/unit/repository.test.ts snippet */
beforeEach(() => {
  tempDir = path.join(os.tmpdir(), `scrolly-test-${Date.now()}`);
  // AUDIT FIX: Ensure directory exists recursively for Linux environments
  fs.mkdirSync(tempDir, { recursive: true });
  repo = new ContentRepository(tempDir);
});

  afterEach(() => {
    // Clean up to prevent storage bloat in CI
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("loads markdown content and frontmatter correctly", async () => {
    const sampleContent = `---
title: "Technical Audit"
layout: "presentation"
---
# Content Header`;

    const filePath = path.join(tempDir, "sample.md");
    fs.writeFileSync(filePath, sampleContent, "utf8");

    const result = await repo.getPageBySlug("sample");

    expect(result.slug).toBe("sample");
    expect(result.frontmatter.title).toBe("Technical Audit");
    expect(result.content.trim()).toBe("# Content Header");
  });

  it("throws error when file is missing", async () => {
    await expect(repo.getPageBySlug("non-existent")).rejects.toThrow();
  });
});