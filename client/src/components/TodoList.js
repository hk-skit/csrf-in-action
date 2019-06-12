import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onToggle }) => (
  <ul style={{ listStyle: `none`, padding: 0, margin: 0 }}>
    {todos.map(todo => (
      <li key={todo._id}>
        <Todo
          complete={todo.complete}
          text={todo.text}
          onToggle={complete => onToggle({ ...todo, complete })}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
