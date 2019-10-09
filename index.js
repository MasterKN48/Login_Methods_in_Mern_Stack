//module loadinga ns const assigning
const express  = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
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
let expiryDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); //Session automatically expires after 1 day
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
require('./config/passport-setup');

//routes
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/success', (req, res) => res.send('Success full '))
app.get('/login', (req, res) => res.send('Login please!'))
// auth routes
app.use('/api',authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => `Server running on port ${port} 🔥`);
