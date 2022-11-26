const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class HTTPErrors extends Error {
  constructor(
    statusCode = StatusCodes.BAD_REQUEST,
    message = "Bad Request",
    error = ReasonPhrases.BAD_REQUEST
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = statusCode;
    this.name = error;
    Error.captureStackTrace(this);
  }
}

module.exports = HTTPErrors;
