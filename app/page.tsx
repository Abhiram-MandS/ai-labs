'use client';

import { useState, useEffect } from 'react';
import { Layout, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import ContentCard from '@/components/ContentCard';
import ContentModal from '@/components/ContentModal';
import QuickNotes from '@/components/QuickNotes';
import { INITIAL_CONTENT } from '@/lib/data';
import { ContentItem } from '@/lib/types';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState(INITIAL_CONTENT);
  const [greeting, setGreeting] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  // Open/close item and sync URL hash
  const openItem = (item: ContentItem) => {
    setSelectedItem(item);
    window.history.replaceState(null, '', `#${item.slug}`);
  };

  const closeItem = () => {
    setSelectedItem(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  // Restore item from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = INITIAL_CONTENT.find((item) => item.slug === hash);
      if (match) setSelectedItem(match);
    }
  }, []);

  // Listen for browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const match = INITIAL_CONTENT.find((item) => item.slug === hash);
        setSelectedItem(match || null);
      } else {
        setSelectedItem(null);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Greeting Logic
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Dark mode persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('ai_labs_theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('ai_labs_theme', newTheme ? 'dark' : 'light');
  };

  // Filter Logic
  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = INITIAL_CONTENT.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.description.toLowerCase().includes(lowerQuery) ||
        item.content.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      return matchesCategory && matchesSearch;
    });
    setFilteredContent(filtered);
  }, [activeCategory, searchQuery]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const categoryLabel = activeCategory === 'all' 
    ? 'All Content' 
    : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-200 selection:bg-indigo-500/30 transition-colors duration-300">
        <Sidebar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />

        <main className="pl-20 lg:pl-64 min-h-screen transition-all duration-300">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{greeting}, Explorer.</h1>
                <p className="text-sm text-slate-500">Your AI knowledge command center.</p>
              </div>
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          </header>

          {/* Content */}
          <div className="max-w-7xl mx-auto p-6">
            {/* Quick Stats */}
            {activeCategory === 'all' && !searchQuery && (
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/10">
                   <div className="flex items-center gap-3 mb-2">
                     <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                       <Layout className="w-5 h-5" />
                     </div>
                     <span className="font-semibold text-indigo-100">Total Items</span>
                   </div>
                   <div className="text-3xl font-bold">{INITIAL_CONTENT.length}</div>
                 </div>
                 
                 <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-start relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1 z-10">Welcome to AI Labs International</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm z-10">Discover prompts, skills, tips, documentation, and resources.</p>
                 </div>
              </div>
            )}

            {/* Grid Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium text-slate-700 dark:text-slate-200">
                {categoryLabel}
              </h2>
              <span className="text-xs text-slate-500 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                {filteredContent.length} results
              </span>
            </div>
            
            {/* Content Grid */}
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredContent.map((item) => (
                  <ContentCard 
                    key={item.id} 
                    item={item} 
                    onClick={() => openItem(item)}
                  />
                ))}
                
                {/* "Add New" Placeholder */}
                <button className="group relative border border-dashed border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50 min-h-[200px]">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 flex items-center justify-center mb-4 transition-colors shadow-sm dark:shadow-none border border-slate-100 dark:border-transparent">
                    <Plus className="w-6 h-6 text-slate-400 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">Add Custom Item</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
                <Layout className="w-12 h-12 mb-4 opacity-20" />
                <p>No content found matching &quot;{searchQuery}&quot;</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                  className="mt-4 text-indigo-500 dark:text-indigo-400 text-sm hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Modal */}
        <ContentModal item={selectedItem} onClose={closeItem} />

        {/* Scratchpad */}
        <QuickNotes />
      </div>
    </div>
  );
}

