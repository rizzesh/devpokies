'use client';

import { motion } from 'framer-motion';
import { Skull, FlaskConical, TrendingUp } from 'lucide-react';

interface AIAnalysisProps {
  analysis: {
    roast: string;
    proTip: string;
    prediction: string;
  } | null;
  isLoading: boolean;
}

export default function AIAnalysis({ analysis, isLoading }: AIAnalysisProps) {
  if (isLoading) {
    return (
      <div className="anime-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem', background: '#111' }}>
        <div className="skeleton" style={{ height: '150px', width: '100%', border: '4px solid #333' }} />
        <div className="skeleton" style={{ height: '100px', width: '100%', border: '4px solid #333' }} />
        <div className="skeleton" style={{ height: '150px', width: '100%', border: '4px solid #333' }} />
        <style dangerouslySetInnerHTML={{ __html: `
          .skeleton { 
            background: linear-gradient(90deg, #111 25%, #222 50%, #111 75%);
            background-size: 200% 100%;
            animation: loading 1s infinite;
          }
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}} />
      </div>
    );
  }

  if (!analysis) return (
    <div className="anime-card" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
       <p style={{ color: 'var(--accent-green)', fontFamily: 'monospace' }}> {">"} WAITING FOR SCAN DATA...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="anime-card"
      style={{ height: '100%', background: '#000', color: '#fff', border: '5px solid var(--accent-green)' }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
          <Skull style={{ color: 'var(--accent-green)' }} size={32} />
          <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-green)' }}>The Diabolical Roast</h2>
        </div>
        <div className="villain-bubble">
           <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontWeight: 'bold' }}>
            "{analysis.roast}"
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
          <FlaskConical style={{ color: 'var(--accent-blue)' }} size={28} />
          <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-blue)' }}>Evil Experiment Tip</h2>
        </div>
        <div style={{ borderLeft: '4px solid var(--accent-blue)', paddingLeft: '1.5rem', opacity: 0.9 }}>
          <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            {analysis.proTip}
          </p>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
          <TrendingUp style={{ color: '#ff00ff' }} size={28} />
          <h2 style={{ fontSize: '1.5rem', color: '#ff00ff' }}>Bio-Engineered Status</h2>
        </div>
        <div style={{ background: '#111', padding: '1rem', border: '1px solid #333' }}>
          <p style={{ opacity: 0.8, lineHeight: '1.5', fontFamily: 'monospace' }}>
             {">"} PREDICTION: {analysis.prediction}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
