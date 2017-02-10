const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const updater = require('./src/updater');

const path = require('path');
const fs = require('fs');

const index = require('./routes/index');
const author = require('./routes/author');
const login = require('./routes/login');
const register = require('./routes/register');

const config = require('./config');

startServer(express());

function setting(app) {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.set('port', config.port);
}

function uses(app) {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(session({
        secret: config.secret,
        resave: false,
        saveUninitialized: false
    }));
}

function startServer(app) {
    updater();
    checkFolders();
    setting(app);
    uses(app);
    useRouters(app);
    listen(app);
}

function useRouters(app) {
    app.use('/', index);
    app.use('/author', author);
    app.use('/login', login);
    app.use('/register', register);
}

function listen(app) {
    app.listen(app.get('port'), () => console.log('서버가 켜졌습니다.'));
}

function checkFolders() {
    try {
        fs.accessSync('./database');
        fs.accessSync('./database/files');
        fs.accessSync('./database/user');
    } catch(err) {
        fs.mkdirSync('./database');
        fs.mkdirSync('./database/files');
        fs.mkdirSync('./database/user');
    }
}
