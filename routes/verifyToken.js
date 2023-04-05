const jwt = require("jsonwebtoken")
const config = require('../config/auth.config')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader){
        // res.send("aman")
        const token = authHeader.split(" ")[1]
        jwt.verify(token, config.secret, (err, user) => {
            if(err) return res.json({ success: false, message: "Token tidak valid" });
            req.user = user
            next()
        } )
    } else {
        return res.json({ success: false, message: "Data Authentikasi anda tidak ada" });
    }
}

module.exports = {
    verifyToken
}