'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="relative group w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl leading-5 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 sm:text-sm transition-all shadow-sm"
        placeholder="Search content..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
         <span className="text-slate-400 dark:text-slate-600 text-xs border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">/</span>
      </div>
    </div>
  );
}
