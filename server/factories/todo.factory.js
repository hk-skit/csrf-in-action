const { Todo } = require('../models');

module.exports = {
  completeTodos,
  getTodos,
  createTodo,
  removeTodo,
  updateTodo
};

async function createTodo({ username: createdBy, text }) {
  const todo = new Todo({ createdBy, text });
  await todo.save();
  return todo._id;
}

async function completeTodos(createdBy) {
  const bulk = Todo.collection.initializeUnorderedBulkOp();
  bulk.find({ createdBy }).update({ $set: { complete: true } });
  await bulk.execute();
}

async function removeTodo(id) {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw 'Todo not found.';
  }
  await todo.remove();
}

async function updateTodo(id, params) {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw 'Todo not found.';
  }
  Object.assign(todo, params);
  await todo.save();
}

async function getTodos(createdBy) {
  return await Todo.find({ createdBy }, { __v: false });
}
