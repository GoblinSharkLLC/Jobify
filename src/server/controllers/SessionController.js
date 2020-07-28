const jwt = require('jsonwebtoken');

const TOKEN_SECRET = 'weneedajob';
const SessionController = {};

// Start session
SessionController.signToken = (req, res, next) => {
  console.log('Entering signToken');
  // Take the username and userId from createUser/verifyUser, sign a JWT using the userId
  // Username was destructured for debugging purposes.
  try {
    const { username, userId } = res.locals.user;
    console.log('This is the id before signing -> ', userId);
    const accessToken = jwt.sign({ userId }, TOKEN_SECRET);
    res.locals.token = { accessToken };
    console.log('Created token for ', username, ': ', res.locals.token);
    return next();
  } catch (err) {
    return next({
      log: `Error in SessionController.signToken: ${err}`,
      status: 500,
      message: `failed to create JWT`,
    });
  }
};

SessionController.isLoggedIn = (req, res, next) => {
  // Check the accessToken of the request (assigned to variable token) and verify it see if the user is currently logged in.
  console.log('This is req.body: ', req.body);
  const { accessToken } = req.body;
  console.log('Token: ', accessToken);
  console.log('Token type', typeof accessToken);
  jwt.verify(accessToken, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('Error in isLoggedIn', err);
      return next({
        log: 'Error checking session validity in isLoggedin',
        message: { error: `Error in isLogged in: ${err}` },
      });
    }
    // Decoded should contain the userId that it was signed with
    console.log('decoded->', decoded);
    res.locals.currentUser = decoded;
    return next();
  });
};

module.exports = SessionController;
