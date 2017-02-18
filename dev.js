const server = require('./server');
const app = require('express')();

process.env.NODE_ENV = 'development';
server(app);