'use client';

import React, { useState, useEffect } from 'react';
import { Feather, X } from 'lucide-react';

export default function QuickNotes() {
  const [note, setNote] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem('ai_labs_scratchpad');
    if (savedNote) setNote(savedNote);
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setNote(newValue);
    localStorage.setItem('ai_labs_scratchpad', newValue);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 z-30"
      >
        <Feather className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/50 z-30 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center">
          <Feather className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
          Scratchpad
        </span>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <textarea
        className="w-full h-64 p-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 text-sm resize-none focus:outline-none placeholder-slate-400 dark:placeholder-slate-600"
        placeholder="Paste prompts or quick thoughts here..."
        value={note}
        onChange={handleNoteChange}
        spellCheck={false}
      />
      <div className="p-2 bg-slate-50 dark:bg-slate-800/30 text-xs text-slate-400 dark:text-slate-500 text-right border-t border-slate-200 dark:border-slate-800">
        Auto-saved
      </div>
    </div>
  );
}
