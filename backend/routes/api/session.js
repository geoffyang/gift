// external
const express = require('express');
const asyncHandler = require('express-async-handler');

// internal
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router()

/*******************************************/
/*          /api/session Routes            */
/*******************************************/

module.exports = router;

// POST api/session to log in
router.post('/', asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });
    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    await setTokenCookie(res, user);
    return res.json({ user, });
}))

// GET api/session who is current user
router.get('/',restoreUser, asyncHandler(async (req, res, next) => {
    console.log("********************", req.user.toJSON())
    const { user } = req
    if (user) {
        return res.json({ user: user.toSafeObject() });
    } else return res.json({});
}))

// DELETE api/session to log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

module.exports = router;
