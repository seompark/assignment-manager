const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('author', {
		title: global.config.name
	});
});

module.exports = router;
