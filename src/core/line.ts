export function lineOfNeedle(content: string | null, needle: string): number | null {
  if (!content || !needle) {
    return null;
  }

  const index = content.indexOf(needle);
  if (index < 0) {
    return null;
  }

  return content.slice(0, index).split(/\r?\n/).length;
}

export function changedLines(before: string | null, after: string | null): string[] {
  if (!after) {
    return [];
  }

  if (!before) {
    return after.split(/\r?\n/).filter((line) => line.trim().length > 0);
  }

  const beforeSet = new Set(before.split(/\r?\n/).map((line) => line.trim()));
  return after
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .filter((line) => !beforeSet.has(line.trim()));
}

export function lineForChangedText(content: string | null, text: string): number | null {
  if (!content) {
    return null;
  }

  const lines = content.split(/\r?\n/);
  const trimmed = text.trim();
  const index = lines.findIndex((line) => line.trim() === trimmed || line.includes(trimmed));
  return index >= 0 ? index + 1 : null;
}
