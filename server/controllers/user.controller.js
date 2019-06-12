const express = require('express');
const router = express.Router();
const { UserFactory } = require('../factories');

router.get('/', getUsers);

router.post('/register', registerUser);

router.get('/:username', getUser);
router.put('/:id', updateUser);
router.delete('/:username', removeUser);

router.post('/authenticate', authenticate);

module.exports = router;

function authenticate(req, res, next) {
  UserFactory.authenticate(req.body)
    .then(({ token, xsrfToken }) => {
      res.cookie('jwtToken', token, { httpOnly: true });
      res.cookie('xsrfToken', xsrfToken);
      res.json({ token });
    })
    .catch(error => next(error));
}

function getUsers(req, res, next) {
  UserFactory.getUsers()
    .then(users => res.json(users))
    .catch(error => next(error));
}

function getUser(req, res, next) {
  UserFactory.getUser(req.params.username)
    .then(data => res.json({ data }))
    .catch(error => next(error));
}

function registerUser(req, res, next) {
  UserFactory.createUser(req.body)
    .then(_id => res.json({ _id }))
    .catch(error => next(error));
}

function removeUser(req, res, next) {
  UserFactory.removeUser(req.params.username)
    .then(() => res.json({ message: 'Record deleted successfully.' }))
    .catch(error => next(error));
}

function updateUser(req, res, next) {
  UserFactory.updateUser(req.params.id, req.body)
    .then(() => res.json({ message: 'Record updated successfully.' }))
    .catch(error => next(error));
}
