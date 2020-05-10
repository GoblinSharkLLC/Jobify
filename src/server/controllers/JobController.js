const axios = require('axios');
// const db = require('../database.js');

const jobController = {};

jobController.searchJobs = (req, res, next) => {
  // const { location, title as description } = req.query;
  const location = 'New York';
  const description = 'Python';

  axios
    .get('https://jobs.github.com/positions.json?', {
      params: {
        description,
        location,
      },
    })
    .then((result) => {
      console.log(result.data);
      return res.status(200).json(result.data);
    })
    .catch((err) => {
      return next({
        log: 'Error fetching job from API',
        message: { err: 'Error fetching api: ', err },
      });
    });
  // https://jobs.github.com/positions.json?description=python&location=new+york
};

jobController.saveJob = (req, res, next) => {
  return next();
};

jobController.getUserJobs = (req, res, next) => {
  return next();
};

module.exports = jobController;
