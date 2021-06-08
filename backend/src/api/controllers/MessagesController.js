const { con, config } = require("../../config/dbConfig");

module.exports = {
  createMessage: (req, res) => {
    const { message, date, receiver, author, time } = req.body;
    console.log(time)
    const addMessageQuery = `INSERT INTO message VALUES 
        (DEFAULT, '${message}', '${date}', '${receiver}', '${author}', '${time}')`;
    con.query(addMessageQuery, (error, results) => {
      if (error) {
        res.json({ error: error });
      } else {
        res.status(200).json(results);
      }
    });
  },

  getMessages: (req, res) => {
    const { id } = req.params;

    const query = `SELECT m.message_id, m.message, m.message_date, m.receiver, m.author, m.message_time 
    FROM  message as m
    LEFT JOIN message_status as ms
    ON  m.message_id = ms.message_id and ms.user_id = ${id}
    WHERE (m.receiver = ${id} or m.author = ${id}) AND
    (ms.user_id = ${id} OR isnull(ms.user_id))
    AND (ms.deleted = 0 or isnull(ms.deleted) or ms.deleted != 1);`

    con.query(query, (error, results) => {
      if (error) {
        res.json({ error: error });
      } else {
        res.status(200).json(results);
      }
    });
  },

  deleteMessage: (req, res) => {},

  clearChat: (req, res) => {
    const { user, messages } = req.body;

    messages.map((each, index) => {
      const query = `INSERT INTO message_status VALUE (${user}, ${each.message_id}, TRUE, DEFAULT)`;
      con.query(query, (error, results) => {
        if (error) {
          if (index <= 0) {
            console.log(error);
            res.status(400).send({ error: error });
          }
        }
        if (results){
          if (index <= 0){
            console.log(results)
            res.status(200).send(results);
          }
        }
      });
    });
  },

  findMessage: (req, res) => {
    const { id, searchKey, friendId } = req.params
    console.log(friendId)
    const query = `SELECT m.message_id, m.message, m.message_date, m.receiver, m.author 
    FROM  message as m
    LEFT JOIN message_status as ms
    ON  m.message_id = ms.message_id and ms.user_id = ${id} 
  
    WHERE (m.receiver = ${id} or m.author = ${id}) AND
    (ms.user_id = ${id} OR isnull(ms.user_id))
    AND (ms.deleted = 0 or isnull(ms.deleted) or ms.deleted != 1)
    AND m.message LIKE '%${searchKey}%'
    AND (m.author = ${friendId} || m.receiver = ${friendId})`

    con.query(query, (error, results) => {
      if (error){
        console.log(error)
        res.status(400).json({error: error})
      }
      if (results){
        console.log(results)
        if (results.length > 0){
          res.status(200).json(results)
        }else{
          res.status(200).json({message: "No message found"})
        }
      }
    })
  },

  getContactMessage: (req, res) => {
    const { friendId, id, page } = req.params;
    const query = `SELECT m.message_id, m.message, m.message_date, m.receiver, m.author
      FROM  message as m
      LEFT JOIN message_status as ms
      ON  m.message_id = ms.message_id and ms.user_id = 58
      WHERE (m.receiver = ${friendId} AND m.author = ${id}) 
      OR (m.receiver = ${id} AND m.author = ${friendId}) AND
      (ms.user_id = ${id} OR isnull(ms.user_id))
      AND (ms.deleted = 0 or isnull(ms.deleted) or ms.deleted != 1);
    `

    con.query(query, (error, results) => {
      if (error) {
        res.status(400).json({ error })
      }
      if (results) {
        console.log(results.length)
        const pagination = results.reverse().slice((page - 1) * 50, page * 50);
        res.status(200).json(pagination)
      }
    })
  }
};
