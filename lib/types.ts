export interface ContentItem {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: 'prompts' | 'skills' | 'tips' | 'docs' | 'links' | 'agents';
  content: string;
  rawContent?: string; // Full file content with frontmatter (for agents)
  tags: string[];
  url?: string;
  color: string;
}

export interface Category {
  id: string;
  label: string;
  icon: any;
}
