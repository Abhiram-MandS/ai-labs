import matter from 'gray-matter';
import * as fs from 'fs';
import * as path from 'path';

// ─── Configuration ───────────────────────────────────────────────────────────
const CONTENTS_DIR = path.resolve(__dirname, '../contents');
const OUTPUT_FILE = path.resolve(__dirname, '../lib/content-data.ts');

// Category → color mapping (derived automatically from folder name)
const CATEGORY_COLORS: Record<string, string> = {
  prompts: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  skills: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  tips: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  docs: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  links: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  agents: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
};

const VALID_CATEGORIES = Object.keys(CATEGORY_COLORS);

// ─── Types ───────────────────────────────────────────────────────────────────
interface FrontMatter {
  name?: string;
  description?: string;
  tags?: string[];
  url?: string;
}

interface ContentEntry {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  content: string;
  rawContent?: string;
  tags: string[];
  url?: string;
  color: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function titleCase(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugify(filename: string): string {
  return filename
    .replace(/(\.(agent|prompt))?\.md$/, '')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function collectMarkdownFiles(dir: string): { filePath: string; category: string }[] {
  const results: { filePath: string; category: string }[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && VALID_CATEGORIES.includes(entry.name)) {
      const mdFiles = collectMarkdownFilesRecursive(fullPath);
      for (const f of mdFiles) {
        results.push({ filePath: f, category: entry.name });
      }
    }
  }

  return results;
}

function collectMarkdownFilesRecursive(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMarkdownFilesRecursive(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }

  return results;
}

function escapeForTemplate(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  console.log('📦 Building content data from markdown files...');

  const files = collectMarkdownFiles(CONTENTS_DIR);
  console.log(`   Found ${files.length} markdown file(s).`);

  const items: ContentEntry[] = [];

  for (let i = 0; i < files.length; i++) {
    const { filePath, category } = files[i];
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data: fm, content: mdContent } = matter(raw) as { data: FrontMatter; content: string };
    const filename = path.basename(filePath);

    const entry: ContentEntry = {
      id: i + 1,
      slug: slugify(filename),
      name: fm.name || titleCase(filename),
      description: fm.description || '',
      category,
      content: mdContent.trim(),
      tags: fm.tags || [],
      url: fm.url,
      color: CATEGORY_COLORS[category] || CATEGORY_COLORS.prompts,
    };

    // Include raw content (with frontmatter) for agents
    if (category === 'agents') {
      entry.rawContent = raw.trim();
    }

    items.push(entry);

    console.log(`   ✅ ${category}/${filename}`);
  }

  // Generate the TypeScript file
  const output = generateOutput(items);
  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

  console.log(`\n🎉 Generated lib/content-data.ts with ${items.length} items.`);
}

function generateOutput(items: ContentEntry[]): string {
  const itemStrings = items.map((item) => {
    const urlLine = item.url ? `\n    url: '${item.url}',` : '';
    const rawContentLine = item.rawContent ? `\n    rawContent: \`${escapeForTemplate(item.rawContent)}\`,` : '';
    return `  {
    id: ${item.id},
    slug: '${item.slug}',
    name: '${item.name.replace(/'/g, "\\'")}',
    description: '${item.description.replace(/'/g, "\\'")}',
    category: '${item.category}',
    content: \`${escapeForTemplate(item.content)}\`,${rawContentLine}
    tags: [${item.tags.map((t) => `'${t}'`).join(', ')}],${urlLine}
    color: '${item.color}',
  }`;
  });

  return `// ⚠️ AUTO-GENERATED — Do not edit manually.
// Generated by scripts/build-content.ts from contents/**/*.md

import { ContentItem } from './types';

export const ALL_CONTENT: ContentItem[] = [
${itemStrings.join(',\n')},
];
`;
}

// ─── Run ─────────────────────────────────────────────────────────────────────
main();
