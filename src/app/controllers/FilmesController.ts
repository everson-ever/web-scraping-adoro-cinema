const filmesService = require('./../services/Filme');


class FilmesController {

    async index(req: any, res: any) {
        let page = req.query.page || 1;

        let filmes = await filmesService.getFilmes(page);

        return res.status(200).json(filmes);

    }

}

module.exports = new FilmesController();