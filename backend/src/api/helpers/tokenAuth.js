const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (!token){
        res.send("No token")
    }else{
        jwt.verify(token, process.env.JWT_KEY, (error, decode) => {
            if (error){
                console.log(error)
            }else{
                res.status(200).send(decode)
            }
        })
        return next()
    }
}

module.exports = authenticateUser