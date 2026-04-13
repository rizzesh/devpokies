'use client';

import { useState } from 'react';
import { Target, Zap } from 'lucide-react';
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="anime-card"
      style={{ textAlign: 'center', marginBottom: '4rem', background: '#000', color: '#fff', border: '4px solid var(--accent-green)' }}
    >
      <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'red' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'yellow' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'green' }} />
      </div>

      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--accent-green)' }}>
        MISSION CONTROL
      </h1>
      <p style={{ color: '#aaa', marginBottom: '2rem', fontSize: '1.2rem', fontFamily: 'monospace' }}>
        SCANNING PROJECT: POKEROASTER v2.0 // TARGET IDENTIFICATION REQUIRED
      </p>
      
      <form onSubmit={handleSubmit} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ENTER POKEMON NAME..."
          className="input"
          style={{ background: '#111', color: 'var(--accent-green)', borderColor: 'var(--accent-green)', fontFamily: 'monospace' }}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="btn" 
          style={{ background: 'var(--accent-blue)', color: 'white', border: '3px solid white', marginLeft: '10px' }}
          disabled={isLoading}
        >
          {isLoading ? <Zap className="animate-spin" /> : 'INITIATE SCAN'}
        </button>
      </form>
    </motion.div>
  );
}
