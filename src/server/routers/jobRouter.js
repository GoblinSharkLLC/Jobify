const express = require('express');
const axios = require('axios');
const jobController = require('../controllers/JobController.js');

const router = express.Router();

router.get('/', jobController.searchJobs, (req, res, next) => {
  const { location, description } = req.query;
  axios({
    method: 'get',
    url: 'https://jobs.github.com/positions.json?',
    data: {
      description,
      location,
    },
  });
  return next();
});

// https://jobs.github.com/positions.json?description=python&location=new+york

router.post('/', jobController.saveJob, (req, res, next) => {
  return next();
});

module.exports = router;
