'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchHeroProps {
  onSearch: (name: string) => void;
  isLoading: boolean;
}

export default function SearchHero({ onSearch, isLoading }: SearchHeroProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hero-section"
      style={{ textAlign: 'center', marginBottom: '4rem' }}
    >
      <h1 className="shiny-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
        PokeRoaster
      </h1>
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Enter a Pokemon name. Get roasted by AI.
      </p>
      
      <form onSubmit={handleSubmit} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Pikachu, Mewtwo, Magikarp..."
          className="input"
          style={{ paddingRight: '4rem' }}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="btn" 
          style={{ position: 'absolute', right: '5px', top: '5px', bottom: '5px' }}
          disabled={isLoading}
        >
          <Search size={20} />
        </button>
      </form>
    </motion.div>
  );
}
