const expressJwt = require('express-jwt');

const publicRoutes = ['/users/register', '/users/authenticate'];

const isRevoked = async (req, payload, done) => {
  const { xsrfToken } = payload;
  done(null, xsrfToken !== req.get('X-XSRF-TOKEN'));
};

module.exports = () =>
  expressJwt({
    secret: process.env.JWT_SECRET,

    // Without CSRF token.
    getToken: req => req.cookies.jwtToken

    // With CSRF token
    // getToken: req =>
    //   req.get('X-XSRF-TOKEN') && req.cookies.jwtToken
    //     ? req.cookies.jwtToken
    //     : null
    // isRevoked
  }).unless({
    path: publicRoutes
  });
