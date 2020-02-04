const cheerio = require('cheerio');
const request = require('request');
import Filme from './../models/Filme';



class FilmeService {

    private filmes: Array<Filme> = [];
    private filme: Filme;

        getFilmes(page: number) {

        return new Promise((resolve, reject) => {
            request(
                {
                    method: 'GET',
                    url: `http://www.adorocinema.com/filmes/numero-cinemas/?page=${page}`
                },
                (err: any, res: any, body: any) => {
                    if (err) {
                        reject(err);
                        return err;
                    }

                    let $ = cheerio.load(body);

                    $('ul li.mdl .entity-card-list').each((i: any, element: any) => {
                        let casts: Array<string> = [];
                        let directions: Array<string> = [];
                        const cheerioElement = $(element);

                        let title = cheerioElement.find('.meta-title-link').text();
                        let imageSrc = cheerioElement.find('img.thumbnail-img').attr('src');
                        let imageData = cheerioElement.find('img.thumbnail-img').attr('data-src');
                        let image = imageData || imageSrc;
                        let date = cheerioElement.find('.date').text();
                        let trailer = cheerioElement.find('.buttons-holder .button-primary-full').attr('href');
                        let sinopse = cheerioElement.find('.content-txt').text();
                        sinopse = sinopse.replace(/\\n/, '').trim();

                        try {
                            cheerioElement.find('.meta-body-actor').html().match(/(<span)(.*)(<\/span.)/gm).map((el: any) => {
                                let actor = $(el).text();
                                casts.push(actor);
                            });
                            casts.splice(0, 1);
                        } catch (err) {}

                        try {
                            let directionsHTML = cheerioElement.find('.meta-body-direction').html();

                            directionsHTML.match(/(<span)(.*)(<\/span.)/gm).map((el: any) => {
                                let direction = $(el).text();
                                directions.push(direction);
                            }); 
                            directions.splice(0, 1);

                            directionsHTML.match(/(<a)(.*)(<\/a.)/gm).map((el: any) => {
                                let direction = $(el).text();
                                directions.push(direction);
                            }); 

                        } catch (err) {}

                        this.filme = new Filme();


                        this.filme.setTitulo(title);
                        
                        this.filme.setImage(image);
                        this.filme.setDate(date);
                        this.filme.setTrailer(trailer);
                        this.filme.setDirecao(directions);
                        this.filme.setElenco(casts);
                        this.filme.setSinopse(sinopse);

                        this.filmes.push(this.filme);


                    });

                    resolve(this.filmes);

                    
                }
            );

        })

        
    }

}

module.exports = new FilmeService();

