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
          res.status(400).json({
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
      if (userEmail && password !== undefined){
        con.query(query, [userEmail], async (error, results) => {
            if (error){
              console.log(error)
                res.status(400).json({error: error})
            }else{
              if (results.length > 0){
                const passwordsMatch = await bcrypt.compare(password, results[0].user_password)
                const userInfo = [{
                  user_id: results[0].user_id,
                  user_name: results[0].user_name,
                  user_pfp: results[0].user_pfp,
                  user_desc: results[0].user_desc,
                  user_email: results[0].user_email,
                  online_status: results[0].online_status,
                }]
                if (passwordsMatch){
                  const token = await jwt.sign({user: results}, process.env.JWT_KEY)
                  res.cookie('jwt', token, { httpOnly: true, secure: false })
                  res.status(200).json({ token: token, user_info: userInfo })
                }else{
                  res.status(200).json({message: "Email or password incorrect"})
                }
              }else{
                res.status(200).json({message: "Email or password incorrect"})
              }
            }
        })
      }else{
        res.status(400).json({error: "Provide an email and password"})
      }
  },

  getUser: (req, res) => {
    if (req.user){
      console.log(req.user)
      // res.status(200).json({ data: req.user })
      const query = `SELECT * FROM user WHERE user_id = ${req.user.user[0].user_id}`
      con.query(query, (error, results) => {
        if (error) {
          res.status(400).json({ error: error })
        }
        if (results) {
          if (results.length > 0) {
            res.status(200).json({ user: results })
          } else {
            res.status(200).json({message: "User not found" })
          }
        }
      })
    } else {
      res.status(400).json({ message: "Something went wrong" })
    }
  },

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
    const { name, desc, pfp, id, onlineStatus } = req.body
    const query = `UPDATE user 
    SET user_name = '${name}',
    user_desc = '${desc}',
    user_pfp = '${pfp}',
    online_status = ${onlineStatus}
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
        res.status(400).json({error: error})
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
