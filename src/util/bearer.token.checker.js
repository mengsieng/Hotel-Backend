let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'Access Denied'
        });
    }
    try {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Access Denied'
                });
            } else {
                req.decoded = decoded;
                // console.log('This is checker', decoded);
                next();
            }
        });
    } catch (e) {
        return res.status(403).json({
            success: false,
            message: e
        });
    }
};

module.exports = { checkToken };
