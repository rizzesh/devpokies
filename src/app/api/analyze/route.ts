import { NextResponse } from 'next/server';
import { analyzePokemon } from '@/lib/groq';

export async function POST(request: Request) {
  try {
    const pokemonData = await request.json();
    console.log('Analyzing Pokemon:', pokemonData.name);
    
    // Check if API key is present
    if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
      console.error('MISSING API KEY: NEXT_PUBLIC_GROQ_API_KEY is not defined');
      return NextResponse.json({ 
        error: 'Configuration Error', 
        details: 'Groq API Key is missing. Check your .env.local file.' 
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
