import axios from 'axios';


export const fetchPokemonDetails = async (pokemonId) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  return response.data;
};
