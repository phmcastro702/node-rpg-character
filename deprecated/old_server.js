// // TODO: properly handle token validation errors!




// // SETTING UP
// // IMPORTING EXPRESS STUFF
// const express = require('express');
// const app = express();
// const port = 3000;
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');



// app.use(
//   cors({
//     origin: `http://localhost:${port}`,
//     credentials: true
//   })
// );

// // IMPORTING MONGOOSE STUFF
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');




// // Importing routes
// const authRouter = require('./routes/auth');
// const loginPostRouter = require('./routes/loggingInPosts');
// const afterLoginRouter = require('./routes/afterLoginRoutes');


// // Connect to DB
// dotenv.config();

// mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//   if (err) return console.log(err);
//   console.log('Successfully connected to DB!!');
// });




// // MIDDLEWARES (order matters, middlewares executed from top to bottom)

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(express.static(__dirname + '/public'));

// app.set('view engine', 'ejs');



// // Routes Middlewares

// app.use(authRouter);

// app.use('/login', loginPostRouter);

// app.use('/in', afterLoginRouter);



// app.get('/', (req, res) => {

//   // Check if user has active session
//   const hasActiveSession = req.cookies.jid;
//   if (hasActiveSession == null) { return res.render('welcome_login'); }

//   res.redirect(`/login?rtkn=${hasActiveSession}`);
// });




// app.listen(process.env.port || port, () => console.log(`Server listening on http://localhost:${port}`));