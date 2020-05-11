const bcrypt = require('bcrypt');
const db = require('../database.js');

const saltRounds = 10;
const userController = {};

userController.createUser = async (req, res, next) => {
  console.log('Entering createUser');
  console.log('Request body in createUser -> ', req.body);
  const { username, password } = req.body;

  if (!username.length || !password.length) {
    return next({
      log: 'Error in createUser middleware',
      message: { err: 'Nothing was entered into username/password' },
    });
  }

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  // Store hash in your password DB.
  const text =
    'INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *';
  const values = [username.toLowerCase(), hash];

  db.query(text, values)
    .then((result) => {
      console.log(
        'successful query and added the results to db in register',
        result
      );
      res.locals.user = { username, userId: result.rows[0].id };
      console.log('print the username from res.locals', res.locals.user);
      return next();
    })
    .catch((err3) =>
      next({
        error: `Error from database: ${err3}`,
      })
    );
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
