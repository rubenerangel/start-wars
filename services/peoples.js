import axios from 'axios';

export const allPeoples = async (id) => {
  let getPeoples = await axios.get(`https://swapi.dev/api/people/${id}`);
  return getPeoples.data;
};