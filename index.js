var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var path = require('path');
var fs = require('fs');

var index = require('./routes/index');
var author = require('./routes/author');

global.students = JSON.parse(fs.readFileSync('./students.json'), 'w+');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || '80');

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/', index);
app.use('/author', author);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
