const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');

router.post('/register', (req, res) => {
  var password = req.body.password;
  var password2 = req.body.password2;

  if (password == password2) {
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      res.send(user).end()
    });
  } else {
    res.status(500).send("{errors: \"Passwords don't match\"}").end()
  }
});

// Endpoint to login
router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/sorry'
  }),
  (req, res) => {
    res.status(200).json({
      msg: 'login success',
      user: req.user
    });
  }
);

// Endpoint to get current user
router.get('/user', passport.authenticate('local', {
  failureRedirect: '/login'
}), (req, res) => {
  res.status(200).json({
    msg: 'current User',
    user: req.user
  });
})

// Endpoint to logout
router.get('/logout', (req, res) => {
  req.logout();
  res.json({
    msg: 'logout'
  })
});

// login with google
router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.json({
      user: req.user
    })
  });

// login with facebook
router.get('/auth/facebook', passport.authenticate('facebook')); //eg { scope: ['user_friends', 'manage_pages'] }
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.status(200).json({
      msg: 'success',
      user: req.user
    });
  }
);

//login with twitter
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.status(200).json({
      msg: 'success',
      user: req.user
    });
  }
);

//login with reddit
router.get('/auth/reddit', passport.authenticate('reddit'));
router.get('/auth/reddit/callback',
  passport.authenticate('reddit', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.status(200).json({
      msg: 'success',
      user: req.user
    });
  }
);

//login with github
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.status(200).json({
      msg: 'success',
      user: req.user
    });
  }
);

//login with linkedin
router.get('/auth/linkedin', passport.authenticate('linkedin'));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
