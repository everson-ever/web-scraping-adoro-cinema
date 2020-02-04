const cors = require('cors');
const express = require('express');


class App {
    public express: any;

    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(cors());
        this.express.use(express.json());

    }

    routes() {
        this.express.use(require('./src/routes'));
    }

}

module.exports = new App().express;