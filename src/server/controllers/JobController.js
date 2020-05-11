const axios = require('axios');
const db = require('../database.js');

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
  console.log('This is req.body in saveJob: ', req.body);
  const {
    id,
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

  const { userId } = res.locals.currentUser; // Pulling out id of currentUser from res locals

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
  const { userId } = res.locals.currentUser;
  const text = `SELECT * FROM jobs WHERE user_id=$1`;
  const values = [userId];
  db.query(text, values)
    .then((data) => {
      console.log('This is the data in getUserJobs: ', data);
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
  // const { userId } = res.locals.currentUser;
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
        message: { error: 'Error from database finding saved jobs: ', err },
      });
    });
};

jobController.deleteJob = (req, res, next) => {
  return next();
};

module.exports = jobController;
