'use client';

import React from 'react';
import { 
  Grid, 
  FileText, 
  Lightbulb, 
  GraduationCap, 
  BookOpen, 
  Link as LinkIcon,
  Bot,
  Settings,
  Sun,
  Moon,
  Brain
} from 'lucide-react';
import { Category } from '@/lib/types';

interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const CATEGORIES: Category[] = [
  { id: 'all', label: 'All', icon: Grid },
  { id: 'agents', label: 'Agents', icon: Bot },
  { id: 'docs', label: 'Docs', icon: BookOpen },
  { id: 'links', label: 'Links', icon: LinkIcon },
  { id: 'prompts', label: 'Prompts', icon: FileText },
  { id: 'skills', label: 'Skills', icon: GraduationCap },
  { id: 'tips', label: 'Tips', icon: Lightbulb },
];

export default function Sidebar({ activeCategory, setActiveCategory, isDarkMode, toggleTheme }: SidebarProps) {
  return (
    <aside className="w-20 lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center lg:items-start transition-all duration-300 fixed h-full z-20">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 w-full border-b border-slate-200 dark:border-slate-800">
        <div className="bg-indigo-500/10 dark:bg-indigo-500/20 p-2 rounded-lg">
          <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <span className="ml-3 font-bold text-lg text-slate-800 dark:text-slate-100 hidden lg:block tracking-tight">
          AI Labs
        </span>
      </div>

      <nav className="flex-1 w-full py-6 space-y-1 px-2 lg:px-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
              activeCategory === cat.id
                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className={`ml-3 font-medium hidden lg:block ${activeCategory === cat.id ? 'font-semibold' : ''}`}>
              {cat.label}
            </span>
            {activeCategory === cat.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 hidden lg:block shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 w-full border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-center lg:justify-start p-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="ml-3 font-medium hidden lg:block">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        
        <button className="w-full flex items-center justify-center lg:justify-start p-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <Settings className="w-5 h-5" />
          <span className="ml-3 font-medium hidden lg:block">Settings</span>
        </button>
      </div>
    </aside>
  );
}
