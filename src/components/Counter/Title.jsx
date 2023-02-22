import React from 'react';

export const Title = ({ value }) => {
  return (
    <div>
      {value > 10 && <h2>You get point more then 10. Gradulation!!!</h2>}
      <span>{value}</span>
    </div>
  );
};
