const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../../utils/errors/BadRequestError");
const HTTPErrors = require("../../utils/errors/HTTPErros");
const { logger } = require("../../utils/Logger");


const CreateItemValidation = (req,res,next) => {
    const payload = req.body;
    try {
        if(!payload || !Object.keys(payload).length || payload.title == undefined) {
            logger.error(`'title' is required`, {url: req.url})
            throw new BadRequestError(`'title' is required`);
        }

        if(!payload?.title?.trim()) {
            logger.error(`'title' should be non empty string`, {url : req.url})
            throw new BadRequestError(`'title' should be non empty string`);
        }
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = CreateItemValidation;