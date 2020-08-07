import axios from 'axios';

export const allPlanets = async (id) => {
  let getPlanets = await axios.get(`https://swapi.dev/api/planets/${id}`);
  return getPlanets.data;
};