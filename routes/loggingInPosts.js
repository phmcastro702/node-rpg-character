const router = require('express').Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');
const jwtSign = require('jsonwebtoken').sign;



router.get('/', verifyAccessToken, (req, res) => {
    res.cookie(
        'jid',
        jwtSign(
            {
                _id: req.user._id,
                loginType: req.user.loginType
            },
            process.env.rTOKEN_SECRET,
            {
                expiresIn: (req.user.loginType === 'dontremember' || req.user.loginType === 'anon') ? '1d' : '7d'
            }
        ),
        { httpOnly: true }
    );

    res.redirect(`/in/index`);
});


module.exports = router;