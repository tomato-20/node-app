const { StatusCodes } = require("http-status-codes");
const HTTPErrors = require("../../utils/errors/HTTPErros");


const CreateItemValidation = (req,res,next) => {
    const payload = req.body;
    try {
        if(!payload || !Object.keys(payload).length || payload.title == undefined) {
            throw new HTTPErrors(StatusCodes.BAD_REQUEST,`'title' is required`);
        }
        if(!payload?.title?.trim()) {
            throw new HTTPErrors(StatusCodes.BAD_REQUEST,`'title' should be non empty string`);
        }
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = CreateItemValidation;