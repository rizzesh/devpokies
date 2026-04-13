import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
});

export async function analyzePokemon(pokemonData: any) {
  const prompt = `
    You are an evil Anime Villain and Genius Scientist. 
    You have captured this Pokemon for your dark experiments.
    Analyze the following Pokemon data and provide:
    1. A "Diabolical Roast": A mean, dramatic, and arrogant critique of why this Pokemon is weak or pathetic (3-4 sentences). Use villainous laughter (Mwahaha!).
    2. A "Evil Experiment Tip": A twisted or competitive way to use this Pokemon for world domination (1-2 sentences).
    3. A "Bio-Engineered Prediction": What horrible, monstrous form you will transform it into (what it looks like in 1000 years).

    Data: ${JSON.stringify(pokemonData)}

    Return the response in MINIMAL JSON format:
    {
      "roast": "...",
      "proTip": "...",
      "prediction": "..."
    }
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      response_format: { type: 'json_object' },
    });

    return JSON.parse(chatCompletion.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Groq API Error:', error);
    throw error;
  }
}
