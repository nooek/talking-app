const jwt = require("jsonwebtoken")

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.jwt
    console.log("das")
    if (!token){
        res.status(400).json({ error: "No AuthToken" })
    }else{
        await jwt.verify(token, process.env.JWT_KEY, (error, decode) => {
            if (error){
                console.log(error)
                res.status(400).json({error: error}) 
            }else{
                req.user = decode
                return next()
            }
        })
    }
}

module.exports = authenticateUser
