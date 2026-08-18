import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([
  ".git",
  ".next",
  "node_modules",
  "coverage",
]);
const ignoredFiles = new Set([
  "Commerce_Opportunity_Intelligence_Engine_MASTER.md",
]);

async function collectMarkdown(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectMarkdown(absolute)));
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(absolute);
  }

  return files;
}

function normalize(value) {
  return value.replace(/\\/g, "/").toLowerCase();
}

const files = await collectMarkdown(root);
const byBasename = new Map();
for (const file of files) {
  const key = path.basename(file, ".md").toLowerCase();
  byBasename.set(key, [...(byBasename.get(key) ?? []), file]);
}

const errors = [];
const ids = new Map();

for (const file of files) {
  const relative = path.relative(root, file);
  const content = await readFile(file, "utf8");

  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const idMatch = frontmatter?.[1].match(/^id:\s*(.+)$/m);
  if (idMatch) {
    const documentId = idMatch[1].trim();
    const previous = ids.get(documentId);
    if (previous)
      errors.push(
        `${relative}: ID duplicado ${documentId}; también aparece en ${previous}`,
      );
    ids.set(documentId, relative);
  }

  if (ignoredFiles.has(path.basename(file))) continue;

  const links = content.matchAll(/\[\[([^\]]+)\]\]/g);
  for (const match of links) {
    const rawTarget = match[1].split("|")[0].split("#")[0].trim();
    if (!rawTarget) continue;

    const line = content.slice(0, match.index).split(/\r?\n/).length;
    const normalizedTarget = normalize(rawTarget.replace(/\.md$/i, ""));
    const directCandidate = path.resolve(
      path.dirname(file),
      `${rawTarget.replace(/\.md$/i, "")}.md`,
    );
    const directMatch = files.find(
      (candidate) => normalize(candidate) === normalize(directCandidate),
    );
    if (directMatch) continue;

    const candidates = byBasename.get(path.basename(normalizedTarget)) ?? [];
    if (candidates.length === 1) continue;
    if (candidates.length === 0) {
      errors.push(`${relative}:${line}: enlace inexistente [[${rawTarget}]]`);
    } else {
      errors.push(`${relative}:${line}: enlace ambiguo [[${rawTarget}]]`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Validación documental fallida (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Documentación válida: ${files.length} archivos Markdown, ${ids.size} IDs únicos.`,
);
