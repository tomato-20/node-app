const mysql = require('mysql2');
const dbconfig = require('../configs/db.config')

let pool = mysql.createPool({
    connectionLimit : dbconfig.DB_CONNECTION_LIMIT,
    host: dbconfig.DB_HOST,
    port: dbconfig.DB_PORT,
    user: dbconfig.DB_USERNAME,
    password: dbconfig.DB_PASSWORD,
    database: dbconfig.DB_NAME,
})

module.exports = pool.promise();