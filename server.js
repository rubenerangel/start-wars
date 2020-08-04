import express from 'express';
import route from './routes';

const app = express();
const port = 3000;

app.set('views', './views');

app.set('view engine', 'pug');

/* app.get('/', function (req, res) {
  allMovies();
  res.render('index', {title: 'CC', message: 'MM'});
}); */

app.use('/', route);

app.use( (req, res, next)=>{
  res.status(404);
  if (req.accepts('json')) {
    res.send({error: true, message: 'Route Not found' });
    return;
   }
});

app.listen(port, ()=>{
  console.log('app is listening on port 3000');
});