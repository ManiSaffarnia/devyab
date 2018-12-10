const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    console.log(req.header);
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).json({ msg: 'unAuthorized! login konid' });

    try {
        req.user = jwt.verify(token, (process.env.NODE_ENV === 'production') ? config.get("JWTsecret") : "mani");
        next();
    }
    catch (ex) {
        res.status(400).json({ msg: 'token ghalate kolanm. hackeri sheytoon?! Mikhay goolam bezani?' });
    }

};