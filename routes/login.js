const router = require('express').Router();
const User = require('../src/user');
const store = require('../src/store').getInstance();

router.get('/', (req, res) => {
	if(req.session.auth)
		return res.redirect('/');
	res.render('login', {
		title: '로그인'
	});
});

router.post('/', (req, res) => {
	let user = new User(req.body.id, req.body.password);
	if(store.get(user.getFullId(), new User()).compare(user)) {
		req.session.auth = true;
		req.session.uid = user.getFullId();
		res.json({success: true});
	} else {
		res.json({success: false});
	}
});

module.exports = router;
