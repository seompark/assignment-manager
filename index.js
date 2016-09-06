const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');

const path = require('path');
const fs = require('fs');

const Validator = require('./sources/Validator');

var index = require('./routes/index');
var author = require('./routes/author');
var login = require('./routes/login');
var register = require('./routes/register');

global.students = JSON.parse(fs.readFileSync('./students.json'), 'w+');
global.config = require('./config');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || '80');

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
            return Validator.isAllowedLength();
        },
        isAlreadyRegistered: studentNuber => {
            return Validator.isAlreadyRegistered();
        }
    }
}));

app.use('/', index);
app.use('/author', author);
app.use('/login', login);
//app.use('/register', register);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
