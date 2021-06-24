// external
const router = require('express').Router();

// internal
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const productsRouter = require('./products.js');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');


router.use('/session', sessionRouter)
// POST api/session to log in
// GET api/session returns current user
// DELETE api/session removes token cookie
router.use('/users', usersRouter)
// POST api/users to register

router.use('/products', productsRouter)
// GET api/products
// POST api/products

/*******************************************/
/*              /API Routes                */
/*******************************************/

// POST /api/test

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body })
});


module.exports = router;
