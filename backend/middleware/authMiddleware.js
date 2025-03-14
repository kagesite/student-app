const { expressjwt } = require("express-jwt");

const authMiddleware = expressjwt({
    secret: process.env.JWT_PASSWORD,
    algorithms: ["HS256"],
    requestProperty: "user"
})

module.exports = authMiddleware;