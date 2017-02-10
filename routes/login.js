const router = require('express').Router();
const config = require('../config');

router.get('/', (req, res) => {
    if(req.session.auth)
        return res.redirect('/');
    res.render('login', {
        title: config.name
    });
});

router.post('/', (req, res) => {
    let id = req.body.id,
        pwd = req.body.password;
    //TODO validate
    req.session.auth = true;
    req.session.id = id;
    res.redirect('/');
});

module.exports = router;
