import { NextResponse } from 'next/server';
import { analyzePokemon } from '@/lib/groq';

export async function POST(request: Request) {
  try {
    const pokemonData = await request.json();
    console.log('Analyzing Pokemon:', pokemonData.name);
    
    const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    
    // Check if API key is present
    if (!apiKey) {
      console.error('MISSING API KEY: Environment variable is not defined');
      return NextResponse.json({ 
        error: 'Configuration Error', 
        details: 'Groq API Key is missing. Try RESTARTING your dev server (npm run dev) to load the .env.local file changes!' 
      }, { status: 500 });
    }

    const analysis = await analyzePokemon(pokemonData);
    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('SERVER SIDE ERROR:', error);
    return NextResponse.json({ 
      error: 'Failed to analyze Pokemon', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
