const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const updater = require('./sources/updater');

const path = require('path');
const fs = require('fs');

const Validator = require('./sources/validator');

const index = require('./routes/index');
const author = require('./routes/author');
const login = require('./routes/login');
const register = require('./routes/register');

global.students = JSON.parse(fs.readFileSync('./students.json'), 'w+');
global.config = require('./config');

updater();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', config.port);

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({
    secret: global.config.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(expressValidator({
    customValidator: {
        isAllowedLength: studentNumber => {
            return Validator.isAllowedLength(studentNumber);
        },
        isAlreadyRegistered: studentNumber => {
            return Validator.isAlreadyRegistered(studentNumber);
        }
    }
}));

app.use('/', index);
app.use('/author', author);
app.use('/login', login);
app.use('/register', register);

app.listen(app.get('port'), () => console.log('서버가 켜졌습니다.'));
