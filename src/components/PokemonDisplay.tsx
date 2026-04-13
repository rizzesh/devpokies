'use client';

import { motion } from 'framer-motion';
import { PokemonData } from '@/lib/pokeapi';

interface PokemonDisplayProps {
  data: PokemonData;
}

export default function PokemonDisplay({ data }: PokemonDisplayProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card"
    >
      <div style={{ textAlign: 'center' }}>
        <img 
          src={data.sprite} 
          alt={data.name} 
          style={{ width: '250px', height: '250px', objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }} 
        />
        <h2 style={{ fontSize: '2rem', marginTop: '1rem', color: 'var(--accent)' }}>
          #{data.id} {data.name}
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
          {data.types.map(type => (
            <span key={type} className="type-badge" style={{ 
              background: 'var(--glass)', 
              padding: '0.3rem 0.8rem', 
              borderRadius: '20px',
              fontSize: '0.8rem',
              border: '1px solid var(--card-border)'
            }}>
              {type}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Base Stats</h3>
        {data.stats.map(stat => (
          <div key={stat.name} style={{ marginBottom: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <span style={{ textTransform: 'uppercase', opacity: 0.7 }}>{stat.name}</span>
              <span>{stat.value}</span>
            </div>
            <div style={{ height: '6px', background: 'var(--glass)', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(stat.value / 255) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ height: '100%', background: 'var(--accent)' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Evolution</h3>
        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
          {data.evolution_chain?.join(' → ')}
        </p>
      </div>
    </motion.div>
  );
}
