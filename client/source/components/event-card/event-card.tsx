import './event-card.scss';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {ButtonType, State} from '../../const';
import {formatDateISOString} from '../../utils';
import Selector from '../../store/selector';
import Button from '../button/button';

interface Props {
  id: string;
  mixClassName?: string;
  onEditButtonClick: (id: string) => void;
}

const EventCard: FC<Props> = ({
  id,
  mixClassName,
  onEditButtonClick,
}: Props) => {
  const {
    type,
    city,
    date,
    options,
  } = useSelector((state: State) => Selector.getEventByID(state, id));

  const isFetching = useSelector(Selector.getFetchingStatus);
  const dateISOString = formatDateISOString(new Date(date));

  return (
    <section className={`${mixClassName || ''} event-card`}>

      <h3 className="event-card__heading">{type} in {city}</h3>

      <time dateTime={dateISOString}>{dateISOString}</time>

      {options.length > 0 && (
        <ul>
          {options.map((option) => <li key={option}>{option}</li>)}
        </ul>
      )}

      <Button
        mixClassName="event-card__edit-button"
        type={ButtonType.BUTTON}
        label="Edit"
        disabled={isFetching}
        onClick={() => onEditButtonClick(id)}/>

    </section>
  );
};

export default EventCard;
