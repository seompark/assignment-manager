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
		//TODO render register-done
		res.redirect('/');
	}).catch((err) => {
		//TODO show error
		console.log(err);
		res.redirect('/register');
	});	
});

module.exports = router;
