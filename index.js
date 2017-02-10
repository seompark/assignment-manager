const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const update = require('./src/updater');

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
    app.use(logger('common'));
    useRouters(app);
}

function startServer(app) {
    update().then(() => {
        checkFolders();
        setting(app);
        uses(app);
        listen(app);
    }).catch((err) => {
        console.log(err);
    });
}

function useRouters(app) {
    app.use('/', index);
    app.use('/author', author);
    app.use('/login', login);
    app.use('/register', register);
}

function listen(app) {
    if(process.env.NODE_ENV === 'production') {
        app.listen(80, () => console.log(`서버가 80포트로 배포됩니다.`));
    } else {
        app.listen(app.get('port'), () => console.log('개발용 서버가 켜졌습니다.'));
    }
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
