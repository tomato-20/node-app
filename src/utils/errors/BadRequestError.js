const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const HTTPErrors = require("./HTTPErros");

class BadRequestError extends HTTPErrors  {
    constructor(message) {
        super(StatusCodes.BAD_REQUEST,message,ReasonPhrases.BAD_REQUEST);
        this.message = message
    }
}

module.exports = BadRequestError;