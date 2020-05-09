const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../secret/tokenSecret');
const SessionController = {};

SessionController.signToken = (req, res, next) => {
  try {
    const { id, username } = res.locals.user;
    res.locals.token = jwt.sign({ id, username }, TOKEN_SECRET, {
      expiresIn: '1800s',
    });
    next();
  } catch (err) {
    next({
      log: `Error in SessionController.signToken: ${err}`,
      status: 500,
      message: `failed to create JWT`,
    });
  }
};

module.exports = SessionController;
