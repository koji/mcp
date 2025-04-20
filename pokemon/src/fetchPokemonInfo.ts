interface PokemonInfo {
  name: string
  id: number
  height: number
  weight: number
}

export const fetchPokemonInfo = async (
  pokemonName: string
): Promise<PokemonInfo> => {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'
  const response = await fetch(`${BASE_URL}/${pokemonName}`)
  const data = await response.json()
  return {
    name: data.name,
    id: data.id,
    height: data.height,
    weight: data.weight,
  }
}
