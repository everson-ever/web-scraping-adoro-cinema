const cheerio = require('cheerio');
const request = require('request');
const { promisify } = require('util');




module.exports = {

    async getFilmes(page) {

        return new Promise((resolve, reject) => {
            let filmes = []

            request(
                {
                    method: 'GET',
                    url: `http://www.adorocinema.com/filmes/numero-cinemas/?page=${page}`
                },
                (err, res, body) => {
                    if (err) {
                        reject(err);
                        return err;
                    }

                    let $ = cheerio.load(body);

                    $('ul li.mdl .entity-card-list').each((i, element) => {
                        const casts = [];
                        const cheerioElement = $(element);

                        let title = cheerioElement.find('.meta-title-link').text();
                        let imageSrc = cheerioElement.find('img.thumbnail-img').attr('src');
                        let imageData = cheerioElement.find('img.thumbnail-img').attr('data-src');
                        let image = imageData || imageSrc;
                        let date = cheerioElement.find('.date').text();
                        let trailer = cheerioElement.find('.buttons-holder .button-primary-full').attr('href');

                        try {
                            cheerioElement.find('.meta-body-actor').html().match(/(<span)(.*)(<\/span.)/gm).map((el) => {
                                let actor = $(el).text();
                                casts.push(actor);
                            });
                            casts.splice(0, 1);
                        } catch (err) {}

                        let filme = {};

                        filme.titulo = title;
                        filme.image = image;
                        filme.date = date;
                        filme.trailer = trailer;
                        filme.elenco = casts;

                        filmes.push(filme);

                    });

                    resolve(filmes);

                    
                }
            );

        })

        
    }
}