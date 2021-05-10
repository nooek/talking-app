const mysql = require('mysql2')

const config = {
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    database: "messager",
}

const con = mysql.createConnection(config)

const doQuery = (query) => {
    con.query(query, (error, results) => {
        if (error){
            res.status(400).json({error: error})
        }
        if (results){
            res.status(200).json(results)
        }
    })
}

module.exports = { con, config, doQuery }