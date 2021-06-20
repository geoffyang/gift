const express = require('express')

const apiRouter = require('./api')

const router = express.Router();
router.use('/api', apiRouter)

// GET hello/world
router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send("HELLO WORLD");
});


if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, "../../frontend", 'build', 'index.html')
        )
    })

    // Serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });
}

// GET /api/csrf/restore retrieve csrf token
if (process.env.NODE_ENV!== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.json({})
    })
}
module.exports = router;
