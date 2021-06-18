// external
const router = require('express').Router();

// internal
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser , requireAuth} = require('../../utils/auth.js');
const { User } = require('../../db/models');

// middleware
router.use('/session', sessionRouter) // api/session
router.use('/users', usersRouter) // api/users

/*******************************************/
/*              Routes                     */
/*******************************************/

// authority/api/hello/world
router.post('/hello/world', (req, res) => {
    res.json({ requestBody: req.body })
});


module.exports = router;
