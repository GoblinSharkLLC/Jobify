const CookieController = {};

CookieController.setSessionCookie = (req, res, next) => {
  try {
    const { token } = res.locals;
    console.log('Token from res.locals -> ', token);
    res.cookie('token', token);
    console.log('Assigned res.cookie -> ', res.locals.cookie);
    return next();
  } catch (err) {
    next({
      log: `Failed in setSessionCookie: ${err}`,
      status: 500,
      message: 'Couldnt set Session cookie',
    });
  }
};

module.exports = CookieController;
