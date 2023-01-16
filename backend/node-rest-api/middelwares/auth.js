const jwt = require('jsonwebtoken');
const config = require('config');
const boom = require('boom');

module.exports = function(req, res, next) {
    
    const token = req.header('x-auth-token');
    
    if(!token) {
        return next(boom.forbidden("Access denied. No token provided"));
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateJey'));
        req.user = decoded;
        next();

    } catch (err) {
        return next(boom.forbidden("Invalid token"));
    }
    
    // // check if logged in
    // loggedIn = true;
    // if (loggedIn) {
    //     next();
    // }else {
    //     return res.status(401).json({
    //         message: "you are not logged in"
    //     })
    // }
    // //next();
}