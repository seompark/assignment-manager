const router = require('express').Router();
const path = require('path');
const os = require('os');
const fs = require('fs');
const multer = require('multer');
const mkdirp = require('mkdirp');

const User = require('../src/user');

router.post('/', multer({dest: path.join(os.tmpdir(), '/oam/upload')}).single('file'), (req, res) => {
	if(!req.session.auth) {
		return res.sendStatus(401);
	}
	if(!req.file) {
		return res.sendStatus(400);
	}
	let user = new User(req.session.uid),
		originalName = req.file.originalname,
		filepath = user.getFilePath(),
		tmpFilePath = req.file.destination,
		tmpName = req.file.filename;
	mkdirp.sync(filepath);
	fs.rename(path.join(tmpFilePath, tmpName), path.join(filepath, originalName));
	res.sendStatus(200);
});

module.exports = router;
