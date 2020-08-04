import axios from 'axios';

export const allMovies = async () => {
  let getMovies = await axios.get('https://swapi.dev/api/films/');
  return getMovies.data;
};