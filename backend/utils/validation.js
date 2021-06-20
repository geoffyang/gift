const {  validationResult } = require('express-validator');


function handleValidationErrors(req, res, next) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array().map(e => `${e.msg}`)
        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad Request.';
        next(err)
    }
    return next();
}

module.exports = {handleValidationErrors};
