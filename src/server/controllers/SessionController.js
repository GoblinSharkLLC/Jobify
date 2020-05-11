const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "weneedajob";
const SessionController = {};

// Start session?
SessionController.signToken = (req, res, next) => {
  console.log("Entering signToken");
  try {
    const { username } = res.locals.user;
    const accessToken = jwt.sign({ username }, TOKEN_SECRET, {
      expiresIn: "1800s",
    });
    res.locals.token = { accessToken: accessToken };
    // console.log('Created token for ', username, ': ', res.locals.token);
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
  const { token } = res.cookie;
  try {
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      console.log("decoded->", decoded);
      if (res.locals) console.log("hello");
    });
  } catch (err) {}
};

module.exports = SessionController;
