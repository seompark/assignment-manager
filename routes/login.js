const router = require('express').Router();
const validater = require('../sources/login');

router.get('/', (req, res) => {
    if(req.session.auth)
        res.redirect('/');
    res.render('login', {
        title: global.config.name
    });
});

router.post('/', (req, res) => {
    let id = req.body.id,
        pwd = req.body.password;
    console.log(id);
    console.log(pwd);
    if(!validater(id, pwd)) {
        //flush
        res.redirect('/login');
        return;
    }
    req.session.auth = true;
    req.session.id = id;
    res.redirect('/');
});

module.exports = router;
