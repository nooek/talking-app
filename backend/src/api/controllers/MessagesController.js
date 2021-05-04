const { con, config } = require("../../config/dbConfig");

module.exports = {
  createMessage: (req, res) => {
    const { message, date, receiver, author, blocked } = req.body;
    const query = `INSERT INTO message VALUES 
        (DEFAULT, '${message}', '${date}', '${receiver}', '${author}', '${blocked}', '${true}')`;
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
    const query = `SELECT * FROM message 
        WHERE author = ${id} OR receiver = ${id}`;

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
    const { author, receiver } = req.body;
    const query = `UPDATE message
        SET deleted = TRUE WHERE receiver = ${author} AND author = ${receiver}`;
    con.query(query, (error, results) => {
      if (error) {
        res.json({ error: error });
      } else {
        res.status(200).json(results);
      }
    });
  },
};
