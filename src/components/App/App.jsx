import { PageTitle } from '../EventComopnent/PageTitle/PageTitle';
import { EventBoard } from '../EventComopnent/EventBoard/EventBoard';
import events from '../../json/events';
import { Container } from './App.styled';

export const App = () => {
  return (
    <Container>
      <PageTitle text="24th Core Worlds Coalition Conference" />
      <EventBoard events={events} />
    </Container>
  );
};
