const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const logger = require('morgan');
const favicon = require('serve-favicon');
const update = require('./src/updater');

const path = require('path');
const fs = require('fs');

const index = require('./routes/index');
const author = require('./routes/author');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const upload = require('./routes/upload');

const config = require('./config');

function setting(app) {
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');
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
		saveUninitialized: false,
		store: new FileStore({
			path: path.join(require('os').tmpdir(), 'sessions'),
			logFn: () => true
		})
	}));
	app.use(logger('common'));
	app.use(favicon(__dirname + '/public/favicon.ico'));
	useRouters(app);
}

function useRouters(app) {
	app.use('/', index);
	app.use('/author', author);
	app.use('/login', login);
	app.use('/logout', logout);
	app.use('/register', register);
	app.use('/upload', upload);
}

function listen(app) {
	if(process.env.NODE_ENV === 'production') {
		app.listen(config.port, () => console.log(`서버가 80포트로 배포됩니다.`));
	} else {
		app.listen(config.devPort, () => console.log('개발용 서버가 켜졌습니다.'));
	}
}

function checkFolders() {
	try {
		fs.accessSync(path.join(__dirname, config.dataFolder));
		fs.accessSync(path.join(__dirname, config.dataFolder, 'file'));
		fs.accessSync(path.join(__dirname, config.dataFolder, 'user'));
	} catch(err) {
		fs.mkdirSync(path.join(__dirname, config.dataFolder));
		fs.mkdirSync(path.join(__dirname, config.dataFolder, 'file'));
		fs.mkdirSync(path.join(__dirname, config.dataFolder, 'user'));
	}
}

function startServer(app) {
	update().then(() => {
		checkFolders();
		setting(app);
		uses(app);
		listen(app);
	}).catch((err) => {
		console.log(err);
		process.exit(1);
	});
}

module.exports = startServer;
