import './app.scss';
import React, {FC} from 'react';
import Profile from '../profile/profile';
import EventList from '../event-list/event-list';
import ErrorMessage from '../error-message/error-message';

interface Props {
  mixClassName?: string;
}

const App: FC<Props> = ({
  mixClassName,
}: Props) => (
  <main className={`${mixClassName || ''} app`}>

    <h1 className="app__heading">Travel planner</h1>

    <Profile/>

    <EventList/>

    <ErrorMessage/>

  </main>
);

export default App;
