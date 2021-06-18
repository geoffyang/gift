const express = require('express')

const apiRouter = require('./api')

const router = express.Router();
router.use('/api', apiRouter)

// authority/hello
router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send("HELLO WORLD");
});

module.exports = router;
