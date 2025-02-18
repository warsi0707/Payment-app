const jwt = require("jsonwebtoken")


function Auth(req, res, next){
    const token = req.cookies.token
    if(!token){
        return res.status(404).json({
            message: "Login required",
            authenticated: false
        })
    }
    const decode = jwt.verify(token, process.env.USER_JWT_SECRET)
    if(decode){
        req.user = decode.userId
        next()
    } 
}

module.exports = {
    Auth
}