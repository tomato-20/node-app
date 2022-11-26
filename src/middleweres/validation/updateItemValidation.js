const { StatusCodes } = require("http-status-codes")
const HTTPErrors = require("../../utils/errors/HTTPErros")


const UpdateItemValdiation = (req,res,next) => {
    const payload = req.body;
    try {
        if(!Object.keys(payload).length || (!payload.title && !payload.description))
            throw new HTTPErrors(StatusCodes.BAD_REQUEST, `an update field is required: 'title', 'description'`);
        next()
    } catch (error) {
        next(error)
    }
}   

module.exports = UpdateItemValdiation