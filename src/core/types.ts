import { z } from "zod";

export const severityLevels = ["low", "medium", "high", "critical"] as const;
export type Severity = (typeof severityLevels)[number];

export const severityRank: Record<Severity, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4
};

export const categories = [
  "mcp",
  "credential",
  "execution",
  "network",
  "docker",
  "instruction",
  "workflow",
  "package",
  "transparency",
  "config"
] as const;

export type Category = (typeof categories)[number];

export interface SkippedFile {
  file: string;
  reason: string;
  sizeBytes?: number;
}

export interface ReportError {
  file?: string;
  message: string;
  recoverable: boolean;
}

export interface Finding {
  id: string;
  title: string;
  severity: Severity;
  category: Category;
  file: string;
  lineStart: number | null;
  lineEnd: number | null;
  evidence: string;
  previousValue: unknown | null;
  currentValue: unknown | null;
  whyItMatters: string;
  suggestedReview: string;
  confidence: number;
  isNewCapability: boolean;
  isPermissionExpansion: boolean;
  relatedFiles: string[];
  docsUrl?: string;
  ruleId: string;
}

export type FindingDraft = Omit<Finding, "id" | "severity"> & {
  severity: Severity;
  docsOnly?: boolean;
  negativeInstruction?: boolean;
};

export interface ScopeDiffReport {
  repo: string;
  baseRef: string | null;
  headRef: string | null;
  generatedAt: string;
  summary: string;
  riskLevel: Severity;
  findings: Finding[];
  countsBySeverity: Record<Severity, number>;
  countsByCategory: Record<string, number>;
  skippedFiles: SkippedFile[];
  errors: ReportError[];
  nextReviewActions: string[];
}

export interface FileSnapshot {
  path: string;
  before: string | null;
  after: string | null;
}

export interface AnalysisInput {
  repo: string;
  baseRef: string | null;
  headRef: string | null;
  files: FileSnapshot[];
  skippedFiles: SkippedFile[];
  errors: ReportError[];
}

export const findingSchema = z.object({
  id: z.string(),
  title: z.string(),
  severity: z.enum(severityLevels),
  category: z.enum(categories),
  file: z.string(),
  lineStart: z.number().int().positive().nullable(),
  lineEnd: z.number().int().positive().nullable(),
  evidence: z.string(),
  previousValue: z.any().nullable(),
  currentValue: z.any().nullable(),
  whyItMatters: z.string(),
  suggestedReview: z.string(),
  confidence: z.number().min(0).max(1),
  isNewCapability: z.boolean(),
  isPermissionExpansion: z.boolean(),
  relatedFiles: z.array(z.string()),
  docsUrl: z.string().optional(),
  ruleId: z.string()
});

export const reportSchema = z.object({
  repo: z.string(),
  baseRef: z.string().nullable(),
  headRef: z.string().nullable(),
  generatedAt: z.string(),
  summary: z.string(),
  riskLevel: z.enum(severityLevels),
  findings: z.array(findingSchema),
  countsBySeverity: z.object({
    low: z.number(),
    medium: z.number(),
    high: z.number(),
    critical: z.number()
  }),
  countsByCategory: z.record(z.string(), z.number()),
  skippedFiles: z.array(
    z.object({
      file: z.string(),
      reason: z.string(),
      sizeBytes: z.number().optional()
    })
  ),
  errors: z.array(
    z.object({
      file: z.string().optional(),
      message: z.string(),
      recoverable: z.boolean()
    })
  ),
  nextReviewActions: z.array(z.string())
});
