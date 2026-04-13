'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Clock } from 'lucide-react';

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
      <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="skeleton" style={{ height: '100px', width: '100%', borderRadius: '12px' }} />
        <div className="skeleton" style={{ height: '80px', width: '100%', borderRadius: '12px' }} />
        <div className="skeleton" style={{ height: '120px', width: '100%', borderRadius: '12px' }} />
        <style dangerouslySetInnerHTML={{ __html: `
          .skeleton { 
            background: linear-gradient(90deg, var(--glass) 25%, rgba(255,255,255,0.1) 50%, var(--glass) 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}} />
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card"
      style={{ height: '100%', background: 'linear-gradient(135deg, rgba(20,20,20,0.9), rgba(0,0,0,0.9))' }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
          <Sparkles className="shiny-text" size={24} />
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>The Roast</h2>
        </div>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'italic', opacity: 0.9 }}>
          "{analysis.roast}"
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
          <Zap style={{ color: '#ffd700' }} size={24} />
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Pro Strategy</h2>
        </div>
        <p style={{ opacity: 0.8, lineHeight: '1.5' }}>
          {analysis.proTip}
        </p>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
          <Clock style={{ color: '#00d1ff' }} size={24} />
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Year 3026 Form</h2>
        </div>
        <p style={{ opacity: 0.8, lineHeight: '1.5' }}>
          {analysis.prediction}
        </p>
      </div>
    </motion.div>
  );
}
