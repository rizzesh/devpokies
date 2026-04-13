export interface PokemonData {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: string[];
  stats: { name: string; value: number }[];
  abilities: string[];
  sprite: string;
  flavor_text?: string;
  evolution_chain?: string[];
}

export async function fetchPokemon(nameOrId: string): Promise<PokemonData> {
  const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
  if (!pokemonRes.ok) throw new Error('Pokemon not found');
  
  const pokemon = await pokemonRes.json();
  
  // Fetch species for flavor text and evolution chain URL
  const speciesRes = await fetch(pokemon.species.url);
  const species = await speciesRes.json();
  
  const flavorEntry = species.flavor_text_entries.find(
    (entry: any) => entry.language.name === 'en'
  );
  
  // Fetch evolution chain
  const evoRes = await fetch(species.evolution_chain.url);
  const evoData = await evoRes.json();
  
  const evolution_chain: string[] = [];
  let currentEvo = evoData.chain;
  while (currentEvo) {
    evolution_chain.push(currentEvo.species.name);
    currentEvo = currentEvo.evolves_to[0];
  }

  return {
    name: pokemon.name,
    id: pokemon.id,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((t: any) => t.type.name),
    stats: pokemon.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    abilities: pokemon.abilities.map((a: any) => a.ability.name),
    sprite: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
    flavor_text: flavorEntry ? flavorEntry.flavor_text.replace(/\f/g, ' ') : '',
    evolution_chain,
  };
}
