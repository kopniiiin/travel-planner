import './event-list.scss';
import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import {ButtonType} from '../../const';
import Selector from '../../store/selector';
import Button from '../button/button';
import FilterForm from '../filter-form/filter-form';
import EventForm from '../event-form/event-form';
import EventCard from '../event-card/event-card';

interface Props {
  mixClassName?: string;
}

const EventList: FC<Props> = ({
  mixClassName,
}: Props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [eventID, setEventID] = useState('');
  const email = useSelector(Selector.getEmail);
  const isFetching = useSelector(Selector.getFetchingStatus);
  const eventIDs = useSelector(Selector.getFilteredAndSortedEventIDs);
  const doEventsExist = eventIDs.length > 0;

  const onCreateButtonClick = () => {
    setIsFormOpen(true);
    setEventID('');
  };

  const onEditButtonClick = (id: string) => {
    setIsFormOpen(true);
    setEventID(id);
  };

  const onFormClose = () => {
    setIsFormOpen(false);
    setEventID('');
  };

  return (
    <section className={`${mixClassName || ''} event-list`}>

      <h2 className="event-list__heading">
        {doEventsExist ? 'Events :)' : 'No events :('}
      </h2>

      {email && <FilterForm/>}

      {email && (
        isFormOpen ? (
          <EventForm id={eventID} onClose={onFormClose}/>
        ) : (
          <Button
            mixClassName="event-list__create-button"
            type={ButtonType.BUTTON}
            label="Create"
            disabled={isFetching}
            onClick={onCreateButtonClick}/>
        )
      )}

      <ol className="event-list__list">

        {eventIDs.map((id) => (
          <li key={id} className="event-list__item">
            <EventCard id={id} onEditButtonClick={onEditButtonClick}/>
          </li>
        ))}

      </ol>

    </section>
  );
};

export default EventList;
