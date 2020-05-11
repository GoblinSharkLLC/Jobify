const express = require('express');
const SessionController = require('../controllers/SessionController');
const CookieController = require('../controllers/CookieController');
const UserController = require('../controllers/UserController');
const JobController = require('../controllers/JobController');

const router = express.Router();

// Register a new user
router.post(
  '/register',
  // UserController.checkDuplicates,
  UserController.createUser,
  SessionController.signToken,
  // CookieController.setSessionCookie,
  (req, res) => {
    console.log('Registered User');
    res.status(200).json(res.locals.token);
  }
);

// Login, verify user credentials
router.post(
  '/login',
  UserController.verifyUser,
  SessionController.signToken,
  // SessionController.isLoggedIn,
  (req, res) => {
    // console.log('Back in user/post to /login');
    return res.status(200).json(res.locals.token);
  }
);

// Query the db for users saved jobs and send them back to the client.
router.get(
  '/jobs',
  SessionController.isLoggedIn,
  JobController.getUserJobs,
  (req, res) => {
    return res.status(200);
  }
);

router.post(
  '/jobs',
  SessionController.isLoggedIn,
  JobController.saveJob,
  (req, res) => {
    return res.status(200);
  }
);

router.put(
  '/jobs',
  SessionController.isLoggedIn,
  JobController.updateJob,
  (req, res) => {
    return res.status(200);
  }
);

router.delete(
  '/jobs',
  SessionController.isLoggedIn,
  JobController.deleteJob,
  (req, res) => {
    return res.status(200);
  }
);

module.exports = router;
