import { describe, expect, it } from "vitest";
import { analyzeInput } from "../src/core/analyze.js";
import { renderJson } from "../src/renderers/json.js";
import { renderMarkdown } from "../src/renderers/markdown.js";

describe("renderers", () => {
  it("renders stable Markdown sections", () => {
    const report = analyzeInput({
      repo: "fixture",
      baseRef: null,
      headRef: "main",
      files: [],
      skippedFiles: [],
      errors: []
    });

    const markdown = renderMarkdown(report);
    expect(markdown).toContain("# ScopeDiff Report");
    expect(markdown).toContain("## Summary");
    expect(markdown).toContain("No findings.");
    expect(markdown).toContain("## Limitations");
  });

  it("renders JSON that can be parsed", () => {
    const report = analyzeInput({
      repo: "fixture",
      baseRef: null,
      headRef: "main",
      files: [],
      skippedFiles: [],
      errors: []
    });

    const parsed = JSON.parse(renderJson(report));
    expect(parsed.repo).toBe("fixture");
    expect(parsed.riskLevel).toBe("low");
  });
});
