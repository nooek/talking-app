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
        const query = `SELECT user.user_id, user.user_name, user.user_pfp, user.user_desc, friend.blocked, friend.friend_id
        FROM user JOIN friend where  user.user_id = friend.user_id AND friend.friend_with = ${userId}`
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
        const { id, userId } = req.body
        const query = `
            INSERT INTO friend (friend_id, user_id, friend_with) VALUES
            (DEFAULT, ${id}, ${userId})
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
    },

    blockFriend: (req, res) => {
        const { personId, userId } = req.body
        console.log(personId)
        console.log(userId)
        const query = `UPDATE friend
        SET blocked = TRUE
        WHERE user_id = ${personId} AND friend_with = ${userId}`

        con.query(query, (error, results) => {
            if (error){
                res.json({error: error})
            }else{
                res.status(200).json(results)
            }
        })
    }
}