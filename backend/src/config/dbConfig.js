const mysql = require('mysql2')

const config = {
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    database: "messager",
}

const con = mysql.createConnection(config)

module.exports = { con, config }