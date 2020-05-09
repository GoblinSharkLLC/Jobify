const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const jobRouter = require('./routers/jobRouter');
const userRouter = require('./routers/userRouter');
const contactRouter = require('./routers/contactRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express());
app.use(bodyParser());
app.use(cookieParser());

// GET to /api/search -> jobs router -> jobs controller -> searchJobs, api request
// GET to /api/savedJobs -> jobs router -> jobs controller -> ping database for jobs with the queried user ID
// POST to /api/savedJobs -> jobs router -> jobs controller -> create job in database with given user ID
// DELETE to /api/savedJobs -> jobs router -> jobs controller -> delete saved job
// PUT/PATCH to /api/savedJobs -> jobs router -> jobs controller -> edit job info (notes)
// POST to /api/users -> user router -> users controller -> createUser in database
// POST to /api/contact -> contact router -> contact controller -> createContact in database
// GET to /api/contact -> contact router -> contact controller -> getContact frrm database with queried job

app.use('/api/savedJobs', jobRouter, (req, res) => {
  return res.status(200).json();
});
app.use('/api/users', userRouter, (req, res) => {
  return res.status(200).json();
});
app.use('/api/contacts', contactRouter, (req, res) => {
  return res.status(200).json();
});

app.use(
  '/signup',
  // HASH PW (BCRYPT)
  // STORE USER IN DB
  // JWT
  // SET ISLOGGEDIN
  (req, res) => {
    return res.status(200).json();
  }
);

app.use('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../../index.html'));
});

if (process.env.NODE_env === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../../build')));

  app.get('/', (req, res) => {
    // console.log(req)
    return res
      .status(200)
      .sendFile(path.resolve(__dirname, '../../index.html'));
  });
}

app.use((req, res) => {
  res.status(404).send('Wrong way, turn around: ');
});

app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error!',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(...defaultErr, ...err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
