import React from 'react';
import { PaintingList } from './PaintingList/PaintingList';
import { Section } from './Section/Section';
import paintings from '../json/paintings';

export const App = () => {
  return (
    <>
      <Section title="Image section">
        <PaintingList items={paintings} />
      </Section>
    </>
  );
};
