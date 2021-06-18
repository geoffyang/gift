// external packages
const express = require('express');
const asyncHandler = require('express-async-handler');

// internal packages
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router()


/*******************************************/
/*          /api/users Routes              */
/*******************************************/

// POST /api/users to sign up
router.post('/', asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body
    const user = await User.signup({ username, email, password })
    await setTokenCookie(res, user);
    return res.json(user)
}))


module.exports = router;

