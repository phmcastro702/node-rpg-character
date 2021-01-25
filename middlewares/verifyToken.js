const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
    const token = req.query.rtkn || req.query.tkn || req.query.atkn;
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(
            token, 
            req.query.rtkn != null ? process.env.rTOKEN_SECRET
            : req.query.atkn != null ? process.env.aTOKEN_SECRET
            : process.env.TOKEN_SECRET
        );
        req.user = verified;
        next();
    } catch (err) {
        //res.status(400).send('Invalid Token');
        res.clearCookie('jid');
        res.redirect('/');
    }

};

const verifyRefreshToken = (req, res, next) => {
    const token = req.cookies.jid;
    if (!token) {
        res.status(401);
        console.log('Access Denied, please login again(credentials may have expired)');
        res.clearCookie('jid');
        return res.redirect('/'); 
    }

    try {
        const verified = jwt.verify(
            token, 
            process.env.rTOKEN_SECRET
        );
        req.user = verified;
        next();
    } catch (err) {
        //res.status(400).send('Invalid Token');
        res.clearCookie('jid');
        res.redirect('/');
    }
};


module.exports.verifyAccessToken = verifyAccessToken;
module.exports.verifyRefreshToken = verifyRefreshToken;

