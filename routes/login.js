var router = require('express').Router();

router.get('/', (req, res) => {
    res.render('login', {
        title: '춘천중학교 과제 제출'
    });
});

module.exports = router;
