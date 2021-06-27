// external packages
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// internal packages
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation')
const { singlePublicFileUpload, singleMulterUpload} = require('../../awsS3')

const router = express.Router()

const validateSignup = [
    check("email")
        .exists({ checkFalsy: true })
        .withMessage("You didn't provide an email")
        .isEmail()
        .withMessage("Not a valid email"),
    check("username")
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage("Username must be 2 characters")
        .not().isEmail()
        .withMessage("Username can't be email"),
    check("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage("Password must be 2 or more characters"),
    handleValidationErrors
]

/*******************************************/
/*          /api/users Routes              */
/*******************************************/

// POST /api/users to sign up
router.post('/',  validateSignup, asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    // const profilePicUrl = await singlePublicFileUpload(req.file)
    const user = await User.signup({ username, email, password  })
    await setTokenCookie(res, user);
    return res.json({user})
}))


module.exports = router;

