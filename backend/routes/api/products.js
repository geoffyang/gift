// external packages
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// internal packages
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Product } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation')
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')

const router = express.Router()

const validateUpload = [
    check("email")
        .exists({ checkFalsy: true })
        .withMessage("You didn't provide an email")
    //     .isEmail()
    //     .withMessage("Not a valid email"),
    // check("username")
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 2 })
    //     .withMessage("Username must be 2 characters")
    //     .not().isEmail()
    //     .withMessage("Username can't be email"),
    // check("password")
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 2 })
    //     .withMessage("Password must be 2 or more characters"),
    , handleValidationErrors
]

/*******************************************/
/*          /api/products Routes              */
/*******************************************/

// POST /api/products to upload
router.post('/', requireAuth,singleMulterUpload("image"),
    // validateUpload,
    asyncHandler(async (req, res, next) => {
        try {
            const {
                title,
                shortDescription,
                longDescription,
                userId } = req.body;
            const imageUrl = await singlePublicFileUpload(req.file);
            const product = await Product.upload({ imageUrl, title, shortDescription, longDescription, userId })
            return res.json({ product })
        } catch (err) {
            next(err)
        }
    }))

// GET /api/products
router.get('/',

    asyncHandler(async (req, res, next) => {
        const products = await Product.findAll({
        order: [['id', 'DESC']],
        limit: 10
    });
    return res.json(products)
}))

// DELETE /api/products/:id
router.delete('/:id', requireAuth, asyncHandler(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id)
    if (+req.user.id === +product.userId) {
        console.log(`user ${req.user.id} DEL HIS OWN ITEM`);
        await product.destroy()
    }

    return res.json(req.params.id)
}))

module.exports = router;

