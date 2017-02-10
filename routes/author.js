const router = require('express').Router();
const config = require('../config');

router.get('/', (req, res) => {
    res.render('author', {title: config.name});
});

module.exports = router;
