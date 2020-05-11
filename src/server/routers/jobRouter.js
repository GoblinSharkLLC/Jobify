const express = require('express');
const jobController = require('../controllers/JobController.js');

const router = express.Router();

// Route for sending a search request to the Github API
router.get('/', jobController.searchJobs, (req, res, next) => {
  return next();
});

// router.post('/', jobController.saveJob, (req, res, next) => {
//   return next();
// });

module.exports = router;
