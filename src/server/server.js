const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jobRouter = require('./routers/jobRouter');
const userRouter = require('./routers/userRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
GET to /api/search -> jobs router -> jobs controller -> searchJobs, api request
GET to /api/users/jobs -> user router -> jobs controller -> ping database for jobs with the queried user ID
POST to /api/users/jobs -> user router -> jobs controller -> saveJob, create job in database with given user ID
DELETE to /api/users/jobs -> user router -> jobs controller -> deleteJob, delete saved job
PUT to /api//users/jobs -> user router -> jobs controller -> updateJob, edit job info (notes, contact, status)
POST to /api/users/signup -> user router -> users controller -> createUser, signToken to start a session with newly registered user
POST /api/users/login -> user router -> user controller, sessionController -> verifyUser, signToken to start session with existing user
*/

// Routing a request to search for jobs.
app.use('/api/search', jobRouter, (req, res) => {
  console.log('Back in /search server.js');
});

// app.use('/api/savedJobs', jobRouter, (req, res) => {
//   return res.status(200).json();
// });
app.use('/api/users', userRouter, (req, res) => {
  console.log('Back in server.js');
  // return res.status(200).send('Returning from /api/users in server.js');
});

app.use('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../../index.html'));
});

// Set static path as the bundle.js when in production mode
if (process.env.NODE_env === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../../build')));

  app.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.resolve(__dirname, '../../index.html'));
  });
}

/*
Global Error Handling
*/
app.use('/', (req, res) => {
  res.status(404).send('Wrong way, turn around.');
});

app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error!',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(...defaultErr, ...err);
  console.log('Global error handler: ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
