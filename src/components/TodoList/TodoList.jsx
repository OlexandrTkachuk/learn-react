import React from 'react';

export const TodoList = ({ todos, onDelete }) => {
  return (
    <ul>
      {todos.map(({ id, text }) => (
        <li key={id}>
          <p>{text}</p>
          <button type="button" onClick={() => onDelete(id)}>
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
};
