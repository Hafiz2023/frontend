"use client";

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input, InputProps } from './Input';

export interface SearchBarProps extends Omit<InputProps, 'onChange'> {
  onSearch?: (value: string) => void;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, debounceMs = 300, ...props }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(query);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, onSearch, debounceMs]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ paddingLeft: '2.5rem' }}
        {...props}
      />
      <Search 
        size={18} 
        style={{ 
          position: 'absolute', 
          left: '0.75rem', 
          top: '50%', 
          transform: 'translateY(-50%)',
          color: '#94a3b8',
          pointerEvents: 'none'
        }} 
      />
    </div>
  );
};
