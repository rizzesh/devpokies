import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
});

export async function analyzePokemon(pokemonData: any) {
  const prompt = `
    You are a sarcastic, witty, and slightly mean Pokedex analyst. 
    Analyze the following Pokemon data and provide:
    1. A hilarious "Roast" (3-4 sentences).
    2. A "Pro Tip" for competitive play (1-2 sentences).
    3. A "Future Evolution prediction" (what it looks like in 1000 years).

    Data: ${JSON.stringify(pokemonData)}

    Return the response in JSON format:
    {
      "roast": "...",
      "proTip": "...",
      "prediction": "..."
    }
  `;

  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    response_format: { type: 'json_object' },
  });

  return JSON.parse(chatCompletion.choices[0].message.content || '{}');
}
