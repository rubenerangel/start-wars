import axios from 'axios';

export const allStartships = async () => {
  let getStartships = await axios.get('https://swapi.dev/api/starships/');
  return getStartships.data;
};