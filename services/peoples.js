import axios from 'axios';
import {allPlanets} from './planets'

export const allPeoples = async (id) => {
  let getPeoples = await axios.get(`https://swapi.dev/api/people/${id}`);

  /*  
    El resultado devuelto es un Objeto
    debido a que se necesita mapear, el objeto 
    lo convertimos a array.
  */

  let arrayPerson = [];
  
  arrayPerson.push(getPeoples.data);

  let person = await Promise.all(
    arrayPerson.map(async person => {
    let {name, gender, hair_color, skin_color, eye_color, height, homeworld} = person;

    let idHomeworld = homeworld.split('/').slice(-2)[0];

    let planetPerson = await allPlanets(idHomeworld);

    return {name, gender, hair_color, skin_color, eye_color, height, homeworld: planetPerson.name}
  }));
  
  return person;
};