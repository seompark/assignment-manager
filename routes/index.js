var router = require('express').Router();

router.get('/', (req, res) => {
	if(!req.session.auth) {
		res.redirect('/login');
		return;
	}
	res.render('index', {
		title: '춘천중학교 과제 제출'
	});
});

module.exports = router;
