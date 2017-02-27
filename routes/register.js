const router = require('express').Router();
const User = require('../src/user');

router.get('/', (req, res) => {
	if(req.session.auth) {
		return res.redirect('/');
	}
	res.render('register', {
		title: '회원가입'
	});
});

router.post('/', (req, res) => {
	let user = new User(req.body.id, req.body.password, req.body.name);
	user.register().then(() => {
		res.json({
			success: true
		});
	}).catch((err) => {
		res.json({
			success: false,
			error: err
		});
	});	
});

module.exports = router;
