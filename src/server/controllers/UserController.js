const bcrypt = require('bcrypt');
const db = require('../database.js');

const saltRounds = 10;
const userController = {};

userController.createUser = (req, res, next) => {
  console.log('Entering createUser');
  console.log('Request body in createUser -> ', req.body);
  const { username, password } = req.body;

  if (!username.length || !password.length) {
    return next({
      log: 'Error in createUser middleware',
      message: { err: 'Nothing was entered into username/password' },
    });
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      // Store hash in your password DB.
      const text = 'INSERT INTO users(username, password) VALUES ($1, $2)';
      const values = [username.toLowerCase(), hash];
      db.query(text, values)
        .then((result) => {
          res.locals.user = { username };
          console.log(res.locals.user);
          return next();
        })
        .catch(() =>
          next({
            error: `Error from database: ${err}`,
          })
        );
      return next({
        log: 'Error during bcrypt hashing',
        message: { error: `Error in createUser: ${err}` },
      });
    });
    return next({
      log: 'Error during bcrypt hashing',
      message: { error: `Error in createUser: ${err}` },
    });
  });
  return next();
};

userController.verifyUser = async (req, res, next) => {
  console.log('Entering verifyUser');
  const { username, password } = req.body;

  if (!username.length || !password.length) {
    return next({
      log: 'Error in verifyUser middleware',
      message: { err: 'Nothing was entered into username/password' },
    });
  }

  const text = 'SELECT password, id FROM users WHERE username = $1';
  const values = [username.toLowerCase()];

  // Query the data with the username taken from the request body and find the stored password
  db.query(text, values).then((data) => {
    // console.log('Data returned from database in verifyUser-> ', data);
    const hashedPw = data.rows[0].password;
    const userId = data.rows[0].id;
    // Compare stored password to given password from request body (frontend login page)
    bcrypt.compare(password, hashedPw, (err, result) => {
      console.log('Result of bcrypt -> ', result);
      if (result === true) {
        res.locals.user = { username, userId };
        return next();
      }
      return res.redirect('/signup');
    });
  });
};

module.exports = userController;
