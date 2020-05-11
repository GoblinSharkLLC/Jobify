const express = require('express');
const SessionController = require('../controllers/SessionController');
const UserController = require('../controllers/UserController');
const JobController = require('../controllers/JobController');

const router = express.Router();

// Register a new user and start a new session with a JWT
router.post(
  '/register',
  UserController.createUser,
  SessionController.signToken,
  (req, res) => {
    console.log('Registered User');
    console.log(res.locals.token);
    res.status(200).json(res.locals.token);
  }
);

// Login, verify user credentials and start session with a JWT
router.post(
  '/login',
  UserController.verifyUser,
  SessionController.signToken,
  (req, res) => {
    // console.log('Back in user/post to /login');
    return res.status(200).json(res.locals.token);
  }
);

// Query the db for users saved jobs and send them back to the client.
router.post(
  '/savedJobs',
  SessionController.isLoggedIn,
  JobController.getUserJobs,
  (req, res) => {
    return res.status(200);
  }
);

// save job post to database
router.post(
  '/jobs',
  SessionController.isLoggedIn,
  JobController.saveJob,
  (req, res) => {
    return res.status(200);
  }
);

// change the saved jobs' contact/state/notes in database
router.put(
  '/jobs',
  SessionController.isLoggedIn,
  JobController.updateJob,
  (req, res) => {
    return res.status(200);
  }
);

// delete one of the saved jobs from the database
router.delete(
  '/jobs',
  SessionController.isLoggedIn,
  JobController.deleteJob,
  (req, res) => {
    return res.status(200);
  }
);

module.exports = router;
