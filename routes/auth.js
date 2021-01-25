const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const AnonUser = require('../models/AnonUser');


// Sign Up
router.post('/signup', async (req, res) => {

    // VALIDATE THE DATA BEFORE REGISTERING A NEW USER TO THE DB
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    // Check if user data is already registered in th DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send(`The email \"${req.body.email}\" has already been registered. Try logging in`);


    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Treating the user data to proper database storing(changing password to hashed password)
    const treatedUserObj = req.body;
    treatedUserObj.password = hashedPassword;


    // Create new user
    const newUser = new User(treatedUserObj);

    try {
        const savedUser = await newUser.save();
        console.log(`New user created!`);

        // Creating a user access token
        const accessToken = jwt.sign(
            {
                _id: savedUser._id,
                loginType: 'dontremember'
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.redirect(`/login?tkn=${accessToken}`);

    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/anonsignup', async (req, res) => {
    const newAnonUser = new AnonUser({ username: req.body.username || 'Fellow Adventurer' });

    try {
        const savedAnonUser = await newAnonUser.save();

        console.log('Anon user created!');

        const accessToken = jwt.sign(
            {
                _id: savedAnonUser._id,
                loginType: 'anon'
            },
            process.env.aTOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.redirect(`/login?atkn=${accessToken}`);

    } catch (err) {
        console.log('failed to start anon user session');
        res.status(400).send(err);
    }


});


// Sign In
router.post('/signin', async (req, res) => {
    // VALIDATE REQUEST BODY DATA
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user exists
    const userRetrieved = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.email }] });
    if (!userRetrieved) {
        console.log('Email/Username or password is wrong -EU');
        res.status(400);
        return res.render('users/welcome_login', { data: { loginErrorMessage: 'Invalid email or password' } });
    }

    // Check password
    const validPass = await bcrypt.compare(req.body.password, userRetrieved.password);
    if (!validPass) {
        console.log('Email/Username or password is wrong -P');
        res.status(400);
        return res.render('users/welcome_login', { data: { loginErrorMessage: 'Invalid email or password' } });
    }



    // Creating a user access token
    const accessToken = jwt.sign(
        {
            _id: userRetrieved._id,
            loginType: req.body.rememberMe === 'on' ? 'remember' : 'dontremember'
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '15m' }
    );

    console.log('User logged in!');

    res.redirect(`/login?tkn=${accessToken}`);
});


router.get('/logout', (req, res) => {
    res.clearCookie('jid');
    res.redirect('/');
});


module.exports = router;