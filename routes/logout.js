const router = require('express').Router();

router.post('/', (req, res) => {
	let sess = req.session;
	if(sess.auth) {
		req.session.destroy((err) => {
			if(err)
				console.log(err);
			else
				res.redirect('/login');
		});
	} else {
		res.redirect('/login');
	}
});

module.exports = router;