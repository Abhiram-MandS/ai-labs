'use client';

import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Link as LinkIcon } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ContentItem } from '@/lib/types';

interface ContentModalProps {
  item: ContentItem | null;
  onClose: () => void;
}

export default function ContentModal({ item, onClose }: ContentModalProps) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${item.slug}`;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {item.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {item.description}
            </p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {item.category}
              </span>
              {item.tags.map((tag) => (
                <span key={tag} className="text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 text-sm text-slate-800 dark:text-slate-300 prose prose-sm prose-slate dark:prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{item.content}</Markdown>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Content
                </>
              )}
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 rounded-lg transition-colors font-medium"
              title="Copy shareable link"
            >
              {linkCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  Link Copied!
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 rounded-lg transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Open Link
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
