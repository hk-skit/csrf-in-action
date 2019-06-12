import React from 'react';

const Todo = ({ complete, text, onToggle }) => (
  <p style={{ textDecoration: complete ? `line-through` : '' }}>
    <input
      type="checkbox"
      checked={complete}
      onChange={event => onToggle(event.target.checked)}
    />
    {text}
  </p>
);

export default Todo;
