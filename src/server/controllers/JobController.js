const axios = require('axios');
const db = require('../database.js');

const jobController = {};

jobController.searchJobs = (req, res, next) => {
  // Destructure the search query sent from the frontend
  console.log('Entering searchJobs, req.query: ', req.query);
  const { location, description } = req.query;

  // Send search request to the github API with the destructured search parameters.
  axios
    .get('https://jobs.github.com/positions.json?', {
      params: {
        description,
        location,
      },
    })
    .then((result) => {
      return res.status(200).json(result.data);
    })
    .catch((err) => {
      return next({
        log: 'Error fetching job from API',
        message: { err: `Error fetching api: ${err}` },
      });
    });
  // https://jobs.github.com/positions.json?description=python&location=new+york // example full URL
};

jobController.saveJob = (req, res, next) => {
  // console.log('This is req.body in saveJob: ', req.body);
  // Destructure job parameters from the save job request
  const {
    title,
    city,
    company,
    image,
    url,
    state,
    status,
    posted,
    description,
    contact,
    notes,
  } = req.body.job;

  // Take the userId that was derived from the accessToken in SessionController.isLoggedIn
  const { userId } = res.locals.currentUser;

  // Query the database with the destructured job parameters and derived userId.
  const text = `INSERT INTO jobs(title, city, company, image, url, state, status, posted, description, contact, notes, user_id) 
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
  const values = [
    title,
    city,
    company,
    image,
    url,
    state,
    status,
    posted,
    description,
    contact,
    notes,
    userId,
  ];
  db.query(text, values)
    .then(() => {
      res
        .status(200)
        .send(`Job '${title} at ${company}' saved under user profile`);
      return next();
    })
    .catch((err) => {
      console.log('This is the error in saveJobs: ', err);
      next({
        log: 'Error in saveJobs',
        message: { error: 'Error saving job to database: ', err },
      });
    });
};

jobController.getUserJobs = (req, res, next) => {
  // Take the userId that was derived from the accessToken in SessionController.isLoggedIn
  // Query the database with the derived userId and return all jobs associated with that user.
  const { userId } = res.locals.currentUser;
  const text = `SELECT * FROM jobs WHERE user_id=$1`;
  const values = [userId];
  db.query(text, values)
    .then((data) => {
      // console.log('This is the data in getUserJobs: ', data);
      return res.status(200).json(data.rows);
    })
    .catch((err) => {
      console.log('This is the error in getUserJobs', err);
      return next({
        log: 'Error in getUserJobs',
        message: { error: 'Error from database finding saved jobs: ', err },
      });
    });

  // return next();
};

jobController.updateJob = (req, res, next) => {
  // Send an update request to the database with the destructured job ID and parameters that may have changed.
  // Status, contact, and notes are the only parameters that are setup on the frontend to change.
  const { id, status, contact, notes } = req.body.job;
  const text = `UPDATE jobs
                SET status=$1, contact=$2, notes=$3
                WHERE id=$4`;
  const values = [status, contact, notes, id];
  db.query(text, values)
    .then(() => res.status(200).send(`Job ${id} updated`))
    .catch((err) => {
      console.log('This is the error in getUserJobs', err);
      return next({
        log: 'Error in getUserJobs',
        message: { error: `Error from database finding saved jobs: ${err}` },
      });
    });
};

jobController.deleteJob = (req, res, next) => {
  // console.log('Entering deleteJob');
  // Send a delete query to the database with the destructured job ID
  const { id: jobId } = req.body.job;
  const text = `DELETE FROM jobs WHERE id=$1`;
  const values = [jobId];
  db.query(text, values)
    .then(() => res.status(200).send(`Job ${jobId} deleted`))
    .catch((err) => {
      return next({
        log: 'Error in DeleteJob',
        message: {
          error: `Error from db while deleting the saved job: ${err}`,
        },
      });
    });
};

module.exports = jobController;
