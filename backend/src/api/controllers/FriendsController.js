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
        const query = `SELECT user.user_id, user.user_name, user.user_pfp, user.user_desc, friend.friend_with, friend_status.friend_with, friend.friend_id, friend_status.status
        FROM user 
        JOIN friend 
        JOIN friend_status
        where  user.user_id = friend.user_id 
        AND friend.friend_with = ${userId}
        AND (user.user_id = friend_status.friend_id OR isnull(friend_status.friend_id))
        AND (friend_status.friend_with = ${userId} OR isnull(friend_status.friend_with));`
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

    sendFriendRequest: (req, res) => {
        const { id, userId } = req.body
        const query = `
            INSERT INTO friend (friend_id, user_id, friend_with) VALUES
            (DEFAULT, ${id}, ${userId})
        `

        con.query(query, (error, results) => {
            if (error){
                console.log(error)
                res.status(400).json({error: error})
            }else{
                res.status(200).json(results)
                const searchFriendAddedQuery = `
                    SELECT * FROM friend
                    WHERE user_id = ${id}
                    AND friend_with = ${userId} 
                `
                con.query(searchFriendAddedQuery, (error, results) => {
                    if (error){
                        console.log(error)
                    }
                    if (results){
                        console.log(results[0].user_id)
                        const addFriendStatusQuery = `
                            INSERT INTO friend_status
                            VALUES (DEFAULT, ${results[0].user_id}, ${results[0].friend_with}, 'REQUESTED')
                        `
                        con.query(addFriendStatusQuery)
                    }
                })
            }
        })
    },

    findFriend: (req, res) => {
        const { name, me } = req.params
        const query = `SELECT user.user_id, user.user_name, user.user_pfp, user.user_desc, friend.friend_with, friend_status.friend_with, friend.friend_id, friend_status.status
        FROM user 
        JOIN friend 
        JOIN friend_status
        where  user.user_id = friend.user_id 
        AND friend.friend_with = ${me} AND user_name LIKE '%${name}%'
        AND (user.user_id = friend_status.friend_id OR isnull(friend_status.friend_id))
        AND (friend_status.friend_with = ${me} OR isnull(friend_status.friend_with));`
        con.query(query, (error, results) => {
            if (error){
                res.status(400).json({error: error})
            }else{
                res.status(200).json(results)
            }
        })
    },

    updateFriendStatus: (req, res) => {
        const { personId, userId, newStatus } = req.body
        
        if (newStatus === "DENIED" || newStatus === "ACCEPTED" || newStatus === "REQUESTED"){
            console.log(newStatus)
            const query = `UPDATE friend_status
            SET status = '${newStatus}'
            WHERE (friend_id = '${personId}' AND friend_with = '${userId}')
            OR (friend_id = '${userId}' AND friend_with = '${personId}')`

            con.query(query, (error, results) => {
                if (error){
                    res.status(400).json({error: error})
                }
                if (results){
                    res.status(200).json(results)
                }
            })
        }

        if (newStatus === "BLOCKED"){
            const query = `UPDATE friend_status
            SET status = '${newStatus}'
            WHERE (friend_id = '${personId}' AND friend_with = '${userId}')`
            con.query(query, (error, results) => {
                if (error){
                    res.status(400).json({error: error})
                }
                if (results){
                    res.status(200).json(results)
                }
            })
        }
    }
}