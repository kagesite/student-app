const { expressjwt } = require("express-jwt");

const AuthMiddleware = expressjwt({
    secret: process.env.JWT_PASSWORD,
    algorithms: ["HS256"],
    requestProperty: "user"
})

// const adminAuthMiddleware = expressjwt({
//     secret: process.env.JWT_PASSWORD,
//     algorithms: ["HS256"],
//     requestProperty: "admin"
// })

module.exports = AuthMiddleware