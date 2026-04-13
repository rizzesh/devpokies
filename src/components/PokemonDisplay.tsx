'use client';

import { motion } from 'framer-motion';
import { PokemonData } from '@/lib/pokeapi';

interface PokemonDisplayProps {
  data: PokemonData;
}

export default function PokemonDisplay({ data }: PokemonDisplayProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="anime-card"
    >
      <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-blue)', color: 'white', padding: '5px 15px', fontWeight: 'bold' }}>
        BIO-SCAN COMPLETE
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-block', border: '4px solid black', padding: '20px', background: '#f0f0f0', boxShadow: '5px 5px 0px var(--accent-blue)' }}>
          <img 
            src={data.sprite} 
            alt={data.name} 
            style={{ width: '200px', height: '200px', objectFit: 'contain' }} 
          />
        </div>
        <h2 style={{ fontSize: '2.5rem', marginTop: '1.5rem', color: 'black' }}>
           {data.name} <span style={{ fontSize: '1rem', verticalAlign: 'middle', opacity: 0.5 }}>#{data.id}</span>
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
          {data.types.map(type => (
            <span key={type} className="type-badge">
              {type}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: '1rem', background: '#f9f9f9', border: '2px dashed #000' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Vulnerability Report</h3>
        {data.stats.map(stat => (
          <div key={stat.name} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.9rem' }}>
              <span style={{ textTransform: 'uppercase' }}>{stat.name}</span>
              <span>{stat.value}</span>
            </div>
            <div className="stat-bar-container">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(stat.value / 255) * 100}%` }}
                transition={{ duration: 1, ease: 'backOut' }}
                className="stat-bar"
                style={{ background: stat.value > 100 ? 'var(--accent-blue)' : 'var(--accent-green)' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', borderTop: '4px solid black', paddingTop: '1rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Evolutionary Path</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {data.evolution_chain?.map((name, i) => (
            <span key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 'bold', textDecoration: name === data.name ? 'underline' : 'none' }}>{name}</span>
              {i < (data.evolution_chain?.length || 0) - 1 && <span>»</span>}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
