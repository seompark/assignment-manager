const router = require('express').Router();
const config = require('../config');
const store = require('../src/store').getInstance();

router.get('/', (req, res) => {
	if (!req.session.auth) {
		res.redirect('/login');
		return;
	}
	res.render('index', {
		title: config.name,
		name: store.get(req.session.uid).getName()
	});
});

module.exports = router;
