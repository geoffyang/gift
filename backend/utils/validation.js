const { check, validationResult } = require('express-validator');


function handleValidationErrors(req, res, next) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.toArray().map(e => { e.msg })
        const err = Err('Bad request.');
        err.status = 400;
        err.title = 'Bad Request.';
        next(err)
    }
    return next();
}

module.exports = handleValidationErrors;
