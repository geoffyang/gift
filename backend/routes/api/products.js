// external packages
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// internal packages
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Product, Review } = require('../../db/models');
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
/*                                         */
/*          /api/products Routes           */
/*                                         */
/*******************************************/

// POST /api/products to upload
router.post('/', requireAuth, singleMulterUpload("image"),
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
    })
)
// GET /api/products
router.get('/',
    asyncHandler(async (req, res, next) => {
        const products = await Product.findAll({
            order: [['id', 'DESC']],
            // limit: 10
        });
        return res.json(products)
    })
)
// GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
    const id = +req.params.id
    console.log(`type of id is ${typeof id}`);
    const product = await Product.findByPk(id)
}))
// DELETE /api/products/:id
router.delete('/:id', requireAuth, asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    const product = await Product.findByPk(id)

    if (+req.user.id === +product.userId) {
        console.log(`user ${req.user.id} DEL HIS OWN ITEM`);
        await product.destroy()
    }

    return res.json(id)
}))
// PUT /api/products/:id
router.put('/:id', requireAuth, asyncHandler(async (req, res, next) => {
    try {
        const id = +req.params.id;
        const { title,
            shortDescription,
            longDescription,
            userId } = req.body

        const product = await Product.findByPk(id);

        const updatedProduct = await product.update({
            title,
            shortDescription,
            longDescription,
            userId
        });
        return res.json({ updatedProduct })
    } catch (e) { console.log(e) }
}));

/*******************************************/
/*                                         */
/*    /api/products/:id/discussion Routes  */
/*                                         */
/*******************************************/

// GET /api/products/:productId/discussions
router.get('/:productId/discussions', asyncHandler(async (req, res, next) => {
    const productId = +req.params.productId
    const discussions = await Review.findAll({
        where: {
            productId
        },
        order: [['id', 'DESC']],
        // limit: 10
    });
    return res.json(discussions)
}))

// POST /api/products/:productId/discussions/
router.post('/:productId/discussions', requireAuth, asyncHandler(async (req, res, next) => {
    try {
        const {
            text,
            productId,
            userId } = req.body;
        const discussion = await Review.upload({ text, userId, productId })
        return res.json({ discussion })
    } catch (err) {
        next(err)
    }
}))
// DELETE /api/products/:productId/discussions/:discussionId
router.delete('/:productId/discussions/:discussionId', asyncHandler(async (req, res, next) => {
    const productId = +req.params.productId
    const discussionId = +req.params.discussionId
    const discussion = await Review.findByPk(discussionId);
    await discussion.destroy()
    return res.json(discussionId)
}))
// PUT /api/products/:productId/discussions/:discussionId
router.put('/:productId/discussions/:discussionId', asyncHandler(async (req, res, next) => {
    try {
        const discussionId = +req.params.discussionId
        const discussion = await Review.findByPk(discussionId);
        const { text, productId, userId } = req.body;
        const updatedDiscussion = await discussion.update({ text, productId, userId })
        return res.json(updatedDiscussion)
    } catch (err) {
        next(err)
    }
}))



module.exports = router;

