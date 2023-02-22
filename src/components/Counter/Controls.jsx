import { Component } from 'react';

export const Controls = ({ onChangeValue }) => {
  return (
    <div>
      <button name="increment" onClick={onChangeValue} type="button">
        Увеличить на 1
      </button>
      <button name="decrement" onClick={onChangeValue} type="button">
        Уменьшить на 1
      </button>
    </div>
  );
};
