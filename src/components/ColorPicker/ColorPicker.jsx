import { useState } from 'react';

export const ColorPicker = ({ options }) => {
  const [actveOptionIndex, setActveOptionIndex] = useState(0);

  const makeOptionClassName = index => {
    return index === actveOptionIndex ? styles.activeOption : styles.option;
  };

  const { label } = options[actveOptionIndex];

  return (
    <div>
      <h2>ColorPicker</h2>
      <p>Вибраний колір: {label}</p>
      <div>
        {options.map(({ label, color }, index) => {
          return (
            <button
              key={label}
              aria-label={label}
              style={{ backgroundColor: color }}
              className={makeOptionClassName(index)}
              onClick={() => setActveOptionIndex(index)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};
