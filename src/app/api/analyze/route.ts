import { NextResponse } from 'next/server';
import { analyzePokemon } from '@/lib/groq';

export async function POST(request: Request) {
  try {
    const pokemonData = await request.json();
    const analysis = await analyzePokemon(pokemonData);
    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze Pokemon' }, { status: 500 });
  }
}
