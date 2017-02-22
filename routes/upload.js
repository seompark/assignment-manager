const router = require('express').Router();
const path = require('path');
const os = require('os');
const multer = require('multer');

router.post('/', multer({dest: path.join(os.tmpdir(), '/oam/upload')}).single('file'), (req, res) => {
	if(!req.session.auth) {
		return res.sendStatus(401);
	}
	if(!req.file) {
		return res.sendStatus(400);
	}
	console.log(req.file);
	res.sendStatus(200);
});

module.exports = router;
