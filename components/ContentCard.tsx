'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  GraduationCap, 
  Lightbulb, 
  BookOpen, 
  Link as LinkIcon,
  Bot,
  Copy,
  ExternalLink,
  Check,
  Share2
} from 'lucide-react';
import { ContentItem } from '@/lib/types';

interface ContentCardProps {
  item: ContentItem;
  onClick: () => void;
}

export default function ContentCard({ item, onClick }: ContentCardProps) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const getIcon = () => {
    switch (item.category) {
      case 'prompts': return FileText;
      case 'skills': return GraduationCap;
      case 'tips': return Lightbulb;
      case 'docs': return BookOpen;
      case 'links': return LinkIcon;
      case 'agents': return Bot;
      default: return FileText;
    }
  };

  const Icon = getIcon();

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${item.slug}`;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col h-full cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            title="Copy shareable link"
          >
            {linkCopied ? (
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <Share2 className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            )}
          </button>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            title="Copy content"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            )}
          </button>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              title="Open link"
            >
              <ExternalLink className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            </a>
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {item.name}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-2">
        {item.description}
      </p>

      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 flex-wrap">
        <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
          {item.category}
        </span>
        {item.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
        {item.tags.length > 2 && (
          <span className="text-xs text-slate-400 dark:text-slate-500">
            +{item.tags.length - 2}
          </span>
        )}
      </div>
    </div>
  );
}
