const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cuid = require('cuid');

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  authenticate
};

async function getUsers() {
  return await User.find({}, { __v: false, hash: false });
}

async function getUser(username) {
  return await User.findOne({ username }, { __v: false, hash: false });
}

async function createUser({ username, password }) {
  if (await User.findOne({ username })) {
    throw `Username is already taken.`;
  }

  if (!password || !password.trim()) {
    throw 'Password is mandatory.';
  }

  const user = new User({ username, hash: bcrypt.hashSync(password, 10) });

  await user.save();
  return user._id;
}

async function updateUser(id, params) {
  const user = await User.findById(id);
  if (!user) {
    throw 'User not found';
  }

  if (
    user.username !== params.username &&
    (await User.findOne({ username: params.username }))
  ) {
    throw `Username is already taken.`;
  }

  if (params.password && params.password.trim()) {
    params.hash = bcrypt.hashSync(params.password, 10);
  }

  Object.assign(user, params);

  await user.save();
}

async function removeUser(username) {
  const user = await User.findOne({ username: username });

  if (!user) {
    throw `No user with username: ${username} found.`;
  }
  await user.remove();
}

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.hash)) {
    throw 'Invalid Credentials';
  }
  const xsrfToken = cuid();
  return {
    token: jwt.sign({ sub: user.username, xsrfToken }, process.env.JWT_SECRET),
    xsrfToken
  };
}
