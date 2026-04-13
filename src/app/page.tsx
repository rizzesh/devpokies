'use client';

import { useState } from 'react';
import SearchHero from '@/components/SearchHero';
import PokemonDisplay from '@/components/PokemonDisplay';
import AIAnalysis from '@/components/AIAnalysis';
import { fetchPokemon, PokemonData } from '@/lib/pokeapi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (name: string) => {
    setIsLoading(true);
    setError(null);
    setPokemon(null);
    setAnalysis(null);

    try {
      const data = await fetchPokemon(name);
      setPokemon(data);
      setIsLoading(false);

      // Start AI analysis
      setIsAnalyzing(true);
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        const analysisData = await res.json();
        if (analysisData.error) {
          throw new Error(analysisData.details || analysisData.error);
        }
        setAnalysis(analysisData);
      } catch (aiErr: any) {
        console.error('AI Analysis failed:', aiErr);
        setAnalysis({ 
          roast: "My analysis systems are jammed! This Pokemon is so pathetic it broke my brain.", 
          proTip: "Try connecting to a stable network before I roast you too.", 
          prediction: "A glitch in the matrix." 
        });
      }
    } catch (err: any) {
      console.error('Pokemon fetch error:', err);
      if (err.message === 'Failed to fetch') {
        setError('Network Error: I cannot reach the Pokemon database. Check your internet connection!');
      } else {
        setError(err.message || 'The subject escaped! (Something went wrong)');
      }
      setIsLoading(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="container">
      <SearchHero onSearch={handleSearch} isLoading={isLoading} />

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: 'var(--accent)', textAlign: 'center', marginBottom: '2rem' }}
        >
          Error: {error}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {(pokemon || isLoading) && (
          <div className="grid">
            <div style={{ height: 'fit-content' }}>
              {isLoading ? (
                <div className="glass-card skeleton" style={{ height: '500px', width: '100%', borderRadius: '20px' }} />
              ) : (
                pokemon && <PokemonDisplay data={pokemon} />
              )}
            </div>
            
            <div style={{ minHeight: '400px' }}>
              <AIAnalysis analysis={analysis} isLoading={isAnalyzing || (isLoading && !pokemon)} />
            </div>
          </div>
        )}
      </AnimatePresence>

      <footer style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
        <p>Built for FOSS Weekend 2026 Challenge</p>
        <p>Powered by Groq LPU & PokeAPI</p>
      </footer>

      <style jsx global>{`
        .skeleton { 
          background: linear-gradient(90deg, var(--glass) 25%, rgba(255,255,255,0.1) 50%, var(--glass) 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </main>
  );
}
