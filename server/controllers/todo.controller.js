const express = require('express');
const { TodoFactory } = require('../factories');

const router = express.Router();

router.get('/', getTodos);
router.put('/:todoId', updateTodo);
router.delete('/:todoId', removeTodo);
router.post('/complete', completeTodos);
router.post('/create', createTodo);

module.exports = router;

function getTodos(req, res, next) {
  TodoFactory.getTodos(req.user.sub)
    .then(todos => res.json({ todos }))
    .catch(error => next(error));
}

function completeTodos(req, res, next) {
  const promise = req.query.todoId
    ? TodoFactory.updateTodo(req.query.todoId, { complete: true })
    : TodoFactory.completeTodos(req.user.sub);
  promise
    .then(() => res.json({ message: 'completed successfully.' }))
    .catch(error => next(error));
}

function createTodo(req, res, next) {
  TodoFactory.createTodo({ username: req.user.sub, ...req.body })
    .then(_id => res.json({ _id }))
    .catch(error => next(error));
}

function updateTodo(req, res, next) {
  TodoFactory.updateTodo(req.params.todoId, req.body)
    .then(() => res.json({ message: 'updated successfully.' }))
    .catch(error => next(error));
}

function removeTodo(req, res, next) {
  TodoFactory.removeTodo(req.params.todoId)
    .then(() => res.json({ message: 'deleted successfully.' }))
    .catch(error => next(error));
}
