import {Router} from 'express';
import {allMovies} from '../services/movies';
import {allPlanets} from '../services/planets';
import {allPeoples} from '../services/peoples';
import {allSpecies} from '../services/species';
import {allStartships} from '../services/startships';
import axios from 'axios';

const route = Router();

route.get('/', async function (req, res) {
  const movies = await allMovies();

  let mov = await Promise.all(
    movies.results.map( async (result) => {
  
      let {title, planets, characters, species, starships} = result;
      
      planets = await Promise.all(
        planets.map(async (planet) => {
          const data = (await axios.get(planet)).data;
          return data;
        })
      );

      planets = planets.map(elPlanet => {
        let {name, url} = elPlanet;
        return {name, url:url.split('/').slice(-2)[0]};
      });

      characters = await Promise.all(
        characters.map(async (characte) => {
          const data = (await axios.get(characte)).data;
          return data;
        })  
      );

      characters = characters.map(elActor => {
        let {name, url} = elActor;
        return {name, url:url.split('/').slice(-2)[0]};
      });

      species = await Promise.all(
        species.map(async (specie) => {
          const data = (await axios.get(specie)).data;
          return data;
        })  
      );

      species = species.map(elSpecie => {
        let {name, url} = elSpecie;
        return {name, url:url.split('/').slice(-2)[0]};
      });

      return {title, planets, characters, species, starships};
    })
  );

  const startShips = await allStartships();
  
  let theBiggest = startShips.results.reduce((prev, current) => {
    return (Number(prev.cargo_capacity) > Number(current.cargo_capacity)) ? prev : current
  });
  
  res.render('index', {title: 'Start Wars', movies: mov, startship: theBiggest});
});

route.get('/planet/:id', async function(req, res) {
  const planet = await allPlanets(req.params.id);
  res.render('planet', {planet});
});

route.get('/people/:id', async function(req, res) {
  const people = await allPeoples(req.params.id);
  
  res.render('people', {people});
});

route.get('/specie/:id', async function(req, res) {
  const specie = await allSpecies(req.params.id);
  // console.log('Specie', specie);
  res.render('specie', {specie});
});

export default route;