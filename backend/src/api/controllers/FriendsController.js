const { con } = require("../../config/dbConfig");

module.exports = {
    findFriends: (req, res) => {
        const { name } = req.params
        const query = `SELECT user_id, user_name, user_pfp, user_desc
         FROM user WHERE user_name LIKE '%${name}%'`
        con.query(query, (error, results) => {
            if (error){
                res.send({error: error})
            }else{
                if (results.length > 0){
                    res.status(200).json(results)
                }else{
                    res.status(200).json({message: "No user found"})
                }
            }
        })
    },

    getFriendsByUser: (req, res) => {
        const { userId } = req.params
        const query = `SELECT *
        FROM friend WHERE friend_with = ${userId}`
        con.query(query, (error, results) => {
            if (error){
                res.send({error: error})
            }else{
                if (results.length > 0){
                    res.status(200).json(results)
                }else{
                    res.status(200).json({message: "You don't have friends"})
                }
            }
        })
    },

    addFriend: (req, res) => {
        const { id, name, pfp, description, friendWith } = req.body
        const query = `
            INSERT INTO friend VALUES
            ('${id}', '${name}', '${pfp}', '${description}', '${friendWith}', DEFAULT)
        `

        con.query(query, (error, results) => {
            if (error){
                console.log(error)
                res.json({error: error})
            }else{
                res.json(results)
            }
        })
    },

    findFriend: (req, res) => {
        const { name, me } = req.params
        const query = `SELECT * FROM friend WHERE friend_name LIKE '%${name}%' AND friend_with = ${me}`
        con.query(query, (error, results) => {
            if (error){
                res.json({error: error})
            }else{
                res.status(200).json(results)
            }
        })
    }
}