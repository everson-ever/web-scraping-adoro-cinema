const routes = require('express').Router();

const FilmesController = require('./app/controllers/FilmesController');


routes.get('/filmes-cartaz', FilmesController.index);


module.exports = routes;