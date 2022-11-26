const { HTTPErrors } = require("../utils/errors/HTTPErros")

errorHandlerMiddleware = (error,req,res,next ) => {
   console.log('errorstack',error.stack)
   console.log('err :\n',error)

    if(error instanceof HTTPErrors) {
        res.status(error.status).json({
            name: error.name,
            message: error.message
        })
    }
}

module.exports = errorHandlerMiddleware;