const router = require('express').Router();

// authority/api/test
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body })
});

module.exports = router;
