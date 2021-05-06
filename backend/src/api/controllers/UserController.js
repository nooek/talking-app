const { con, config } = require("../../config/dbConfig");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userAlreadyExists = async (email) => {
  let exists = false;
  const query = `SELECT * FROM user WHERE user_email = '${email}'`;
  const con = await mysql.createConnection(config);
  const [rows] = await con.execute(query);
  if (rows.length > 0) {
    exists = true;
  }
  return exists;
};

module.exports = {
  register: async (req, res) => {
    const { userEmail, password, name, pfp } = req.body
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const userExists = await userAlreadyExists(userEmail);
    const query = `INSERT INTO user (user_name, user_password, user_email, user_pfp)
        VALUES ('${name}', '${passwordEncrypted}', '${userEmail}', '${pfp}')`;
    if (!userExists){
      con.query(query, (error, results) => {
        if (error) {
          res.json({
            error: error,
            message: "An error ocurred, please try again later",
          });
        } else {
            console.log(results)
          res.status(200).json({ message: "You can login now :)" });
        }
      });
    } else {
      res.status(200).json({ message: "This email is already registred" });
    }
  },

  login: async (req, res) => {
      const { userEmail, password } = req.body
      const query = `SELECT * FROM user WHERE user_email = ?`
      con.query(query, [userEmail], async (error, results) => {
          if (error){
            console.log(error)
              res.json({error: error})
          }else{
            if (results.length > 0){
              const passwordsMatch = await bcrypt.compare(password, results[0].user_password)
              if (passwordsMatch){
                const token = await jwt.sign({user: results}, process.env.JWT_KEY)
                res.cookie('jwt', token, { httpOnly: true, secure: false })
                res.json({ token })
              }else{
                res.status(200).json({message: "Email or password incorrect"})
              }
            }else{
              res.status(200).json({message: "Email or password incorrect"})
            }
          }
      })
  },

  getUser: (req, res) => {},

  deleteUser: (req, res) => {
    const { id } = req.body
    const query = `DELETE FROM user
    WHERE user_id = ${id}`
    con.query(query, (error, results) => {
      if (error){
        res.json({error: error})
      }else{
        res.status(200).json(results)
      }
    })
  },

  updateUser: (req, res) => {
    const { name, desc, pfp, id } = req.body
    const query = `UPDATE user 
    SET user_name = '${name}',
    user_desc = '${desc}',
    user_pfp = '${pfp}'
    WHERE user_id = ${id}`

    con.query(query, (error, results) => {
      if (error){
        res.json({error: error})
      }else{
        console.log(results)
        res.status(200).json(results)
      }
    })
  },

  getUserById: (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM user WHERE user_id = '${id}'`
    con.query(query, (error, results) => {
      if (error){
        res.json({error: error})
      }else{
        if (results.length){
          res.status(200).json(results)
        }else{
          res.status(200).json({message: "This user does not exist"})
        }
      }
    })
  }
};
