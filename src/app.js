const express = require('express'),
    cors = require('cors');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const errorHandlerMiddleware = require('./middleweres/errorhandler.middlewere');
    path = require('path');

const mainRoutes = require('./routes');
const HTTPErrors = require('./utils/errors/HTTPErros');
const {logger}  = require('./utils/Logger');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.use((req,res,next) => {
    logger.info(`${req.method} ${req.url}`);
    next()
})

app.use('/api',mainRoutes);

app.use('/*',(req,res,next) => {
    next(new HTTPErrors(StatusCodes.NOT_FOUND, `${req.method} ${req.baseUrl}/${req.url} NOT FOUND`, ReasonPhrases.NOT_FOUND))
})

app.use(errorHandlerMiddleware);

process.on('uncaughtException', (error) => {
    logger.error('uncaught exception', {errorMsg: error.message});
    process.exit(1);
})

module.exports = app;