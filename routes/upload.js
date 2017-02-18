const router = require('express').Router();

router.post('/', (req, res) => {
	if(!req.session.auth) {
		//TODO
		res.redirect('/login');
	}
});

module.exports = router;