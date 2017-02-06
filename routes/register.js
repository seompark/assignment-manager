const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('register', {
        title: global.config.name
    });
});

module.exports = router;
