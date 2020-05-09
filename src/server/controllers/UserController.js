const bcrypt = require('bcrypt');
const db = require('../database.js');

const saltRounds = 10;
const userController = {};

userController.createUser = (req, res, next) => {
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
      const values = [username, hash];
      db.query(text, values)
        .then(() => {
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
};

userController.findUser = (req, res, next) => {
  return next();
};

userController.verifyUser = (req, res, next) => {
  return next();
};

module.exports = userController;
