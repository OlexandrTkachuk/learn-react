import { PageTitle } from './EventComopnent/PageTitle/PageTitle';
import { EventBoard } from './EventComopnent/EventBoard/EventBoard';
import events from '../json/events';

export const App = () => {
  return (
    <>
      <PageTitle text="24th Core Worlds Coalition Conference" />
      <EventBoard events={events} />
    </>
  );
};
