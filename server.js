import express from 'express';
import route from './routes';
var path = require('path');

const app = express();
const port = 3000;

app.set('views', './views');

app.set('view engine', 'pug');

/* app.get('/', function (req, res) {
  allMovies();
  res.render('index', {title: 'CC', message: 'MM'});
}); */

app.use('/', route);

app.use(express.static(path.join(__dirname, 'public')));

// Bootstrap 4 y librerías necesarias
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

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