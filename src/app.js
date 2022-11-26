const express = require('express'),
    cors = require('cors');
const errorHandlerMiddleware = require('./middleweres/errorhandle.middleware');
    path = require('path');

const mainRoutes = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.use('/api',mainRoutes);

app.use((err,req,res,next) => {
    console.log(err.stack || err)
    res.status(500).json({
        msg: err.message || err.msg
    })
});

process.on('uncaughtException', (req,res,next) => {
    // res.status(500).json({msg: 'uncaght exception occured'});
    console.log('uncaught exception')
    process.exit();
})
module.exports = app;