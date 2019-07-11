const express  = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/user')
const Post = require('./models/post')
const morgan=require('morgan');
const key=require('./config/key');
const authRoutes=require('./routes/auth');
// app
const app = express();
// Conenct to DB
mongoose.connect(key.mongodb.dbURI, { useNewUrlParser: true },() => {
  console.log('connected to mongodb');
});

// Middleware
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

// Express Session
let expiryDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 days
app.use(session({
    secret: key.session.cookieKey,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secureProxy: true,
        httpOnly: true,
        expires: expiryDate
      }
  }));
// Passport init
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport-setup')(passport);

//routes
app.get('/', (req, res) => res.send('Hello World!'))

// auth routes
app.use('/api',authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => `Server running on port ${port} 🔥`);