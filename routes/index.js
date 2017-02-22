const router = require('express').Router();
const config = require('../config');

router.get('/', (req, res) => {
	if (!req.session.auth) {
		res.redirect('/login');
		return;
	}
	res.render('index', {
		title: config.name,
	});
});

module.exports = router;
