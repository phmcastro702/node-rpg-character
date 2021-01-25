// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const User = require('../models/user_old');

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/profile', async (req, res) => {
//     const usersInfos = await User.find({});

//     try {
//         res.render('profile.ejs', { data: usersInfos });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// app.post('/signin', async (req, res) => {
//     await User.find({ username: req.body.username, password: req.body.password }, (err, doc) => {
//         if (err) {
//             return res.status(500).send(err);
//         }

//         if (doc.length) {
//             console.log(`user: ${doc} was authenticated and is logged in!`);
//             res.redirect('/profile');
//         } else {
//             console.log(`username not found or wrong / wrong password`)
//         }
//     });

// });

// app.post('/signup', async (req, res) => {
//     if (req.body.email &&
//         req.body.username &&
//         req.body.password &&
//         req.body.passwordConf) {

//         const newUser = new User(req.body);

//         await newUser.save((err, doc) => {
//             if (err) return res.status(500).send(err);

//             console.log(`userData: ${doc} was successfully saved`);
//             res.redirect('/profile');
//         });

//     }
// });

// module.exports = app;