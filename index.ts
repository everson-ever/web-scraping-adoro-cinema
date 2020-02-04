const server = require('./server');

const port = process.env.PORT || 3333;

server.listen(port);