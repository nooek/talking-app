const { con, config } = require("../../config/dbConfig");

module.exports = {
  createMessage: (req, res) => {
    const { message, date, receiver, author, blocked } = req.body;
    const query = `INSERT INTO message VALUES 
        (DEFAULT, '${message}', '${date}', '${receiver}', '${author}')`;
    con.query(query, (error, results) => {
      if (error) {
        res.json({ error: error });
      } else {
        res.status(200).json(results);
      }
    });
  },

  getMessages: (req, res) => {
    const { id } = req.params;

    const query = `SELECT m.message_id, m.message, m.message_date, m.receiver, m.author 
    FROM  message as m
    LEFT JOIN message_status as ms
    ON  m.message_id = ms.message_id 
    WHERE (m.receiver = 52 OR m.author = 52)
    AND (ms.user_id = 52 OR isnull(ms.user_id))
    AND (ms.deleted = 0 or isnull(ms.deleted))`;

    // const query = `SELECT m.message_id, m.message, m.message_date, m.receiver, m.author
    // FROM  message as m
    // LEFT JOIN message_status as ms
    // ON  m.message_id != ms.message_id
    // WHERE m.receiver = ${id} OR m.author = ${id} AND (ms.user_id = ${id} OR isnull(ms.user_id)) AND deleted = 0`;

    // const query = `SELECT message.* FROM  message
    // LEFT OUTER JOIN message_status as ms
    // ON  ms.message_id != message.message_id AND (message.receiver = ${id} OR message.author = ${id})
    // AND (message.receiver = ms.user_id OR message.author = ms.user_id) AND ms.deleted = 0
    // WHERE ms.user_id = ${id}`;

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
};
