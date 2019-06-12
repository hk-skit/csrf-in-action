const express = require('express');
const router = express.Router();
const userRouter = require('./user.controller');
const todoRouter = require('./todo.controller');

router.use('/users', userRouter);

router.use('/todos', todoRouter);

router.use('/logout', logout);

module.exports = router;

function logout(req, res, next) {
  res.clearCookie('jwtToken');
  res.clearCookie('xsrfToken');
  res.json({ message: 'Logout successfully' });
}
