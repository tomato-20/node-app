require('dotenv').config()

module.exports = {
    DB_HOST : process.env.DB_HOST,
    DB_PORT : process.env.DB_PORT,
    DB_USERNAME : process.env.DB_USERNAME,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_NAME : process.env.DB_NAME,
    DB_CONNECTION_LIMIT : process.env.DB_CONNECTION_LIMIT
}