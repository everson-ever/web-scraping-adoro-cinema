const routes = require('express').Router();
const filmesController = require('./app/controllers/FilmesController');



routes.get('/filmes-cartaz', filmesController.index);


module.exports = routes;