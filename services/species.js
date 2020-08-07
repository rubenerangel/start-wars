import axios from 'axios';

export const allSpecies = async (id) => {
  let getSpecie = await axios.get(`https://swapi.dev/api/species/${id}`);
  return getSpecie.data;
};