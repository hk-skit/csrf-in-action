import { ajax } from '../utils';

const getTodos = async () => {
  const { data } = await ajax.get(`/todos`);
  return data;
};

const completeAll = async () => {
  const { data } = await ajax.post('/todos/complete');
  return data;
};

const updateTodo = async todo => {
  const { data } = await ajax.put(`/todos/${todo._id}`, { ...todo });
  return data;
};

const createTodo = async text => {
  const { data } = await ajax.post('/todos/create', { text });
  return data;
};

export default { getTodos, completeAll, updateTodo, createTodo };
