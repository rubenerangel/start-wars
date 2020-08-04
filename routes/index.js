import {Router} from 'express';
import {allMovies} from '../services/movies';
import axios from 'axios';

const route = Router();

route.get('/', async function (req, res) {
  const movies = await allMovies();
  // console.log(movies);

  let mov = await Promise.all(
    movies.results.map( async (result) => {
  
      let {title, planets} = result;
      
  
       planets = await Promise.all(
        planets.map(async (planet) => {
          const data = (await axios.get(planet)).data;
          return data;
        })  
      );
      
      
      return {title, planets};
    })
  );
  
  console.log(mov);

  res.render('index', {title: 'Start Wars', movies: mov});
})

export default route;