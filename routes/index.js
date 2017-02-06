const router = require('express').Router();

router.get('/', (req, res) => {
	if(!req.session.auth) {
		res.redirect('/login');
		return;
	}
	res.render('index', {
		title: global.config.name
	});
});

module.exports = router;
