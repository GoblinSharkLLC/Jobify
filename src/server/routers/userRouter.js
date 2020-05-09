const express = require('express');

const router = express.Router();
// const db = require('../database');
// const jwt = require('jsonwebtoken');
// const TOKEN_SECRET = require('../secret/tokenSecret');
// const SessionController = require('../controllers/SessionController');
// const CookieController = require('../controllers/CookieController');
const UserController = require('../controllers/UserController');

// Register a new user
router.post(
  '/register',
  // UserController.checkDuplicates,
  UserController.createUser,
  // SessionController.signToken,
  // CookieController.setSessionCookie,
  (req, res) => {
    res.send('Created user');
  }
);

// Login, verify user credentials
router.post(
  '/login',
  UserController.verifyUser,
  // SessionController.signToken,
  // CookieController.setSessionCookie,
  (req, res) => {
    // console.log('Back in user/post to /login');
    return res.status(200).send('Sending from /login');
  }
);

module.exports = router;
