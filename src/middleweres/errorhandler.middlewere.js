const HTTPErrors = require("../utils/errors/HTTPErros");

errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);

  if (error instanceof HTTPErrors) {
    return res.status(error.status).json({
      name: error.name,
      message: error.message,
    });
  }

  return res.status(500).json({
    name: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong",
  });
};

module.exports = errorHandlerMiddleware;
