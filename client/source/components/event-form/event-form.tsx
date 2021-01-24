import './event-form.scss';
import React, {FC, useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonType, EventTypeName, City, State} from '../../const';
import {doNothing, formatDateISOString} from '../../utils';
import {AsyncActionCreator} from '../../store/actions';
import Selector from '../../store/selector';
import Button from '../button/button';
import Select from '../select/select';

interface Props {
  id: string;
  onClose: () => void;
}

const EventForm: FC<Props> = ({
  id,
  onClose,
}: Props) => {
  const [type, setType] = useState<string>(EventTypeName.CAR);
  const [city, setCity] = useState<string>(City.MOSCOW);
  const [date, setDate] = useState(formatDateISOString(new Date()));
  const [options, setOptions] = useState<string[]>([]);
  const dispatch = useDispatch();
  const isFetching = useSelector(Selector.getFetchingStatus);
  const event = useSelector((state: State) => Selector.getEventByID(state, id));

  const availableOptions = useSelector((state: State) => {
    return Selector.getOptionsByEventType(state, type);
  });

  useEffect(() => {
    if (event) {
      const {type, city, date, options} = event;
      setType(type);
      setCity(city);
      setDate(formatDateISOString(new Date(date)));
      setOptions(options);
    } else {
      setType(EventTypeName.CAR);
      setCity(City.MOSCOW);
      setDate(formatDateISOString(new Date()));
      setOptions([]);
    }
  }, [event]);

  const onTypeChange = (type: string) => {
    setType(type);
    setOptions([]);
  };
  const onCityChange = (city: string) => setCity(city);

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const onOptionsChange = (option: string) => {
    if (options.includes(option)) {
      const index = options.indexOf(option);
      setOptions([...options.slice(0, index), ...options.slice(index + 1)]);
    } else {
      setOptions([...options, option]);
    }
  };

  const onDeleteButtonClick = () => {
    dispatch(AsyncActionCreator.deleteEvent(id));
    onClose();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action = event ?
      AsyncActionCreator.updateEvent({...event, type, city, date, options}) :
      AsyncActionCreator.createEvent({type, city, date, options});
    dispatch(action);
    onClose();
  };

  return (
    <form className="event-form" onSubmit={onSubmit}>

      <div className="event-form__inputs">

        <Select
          id="type"
          label="Type"
          value={type}
          options={Object.values(EventTypeName)}
          disabled={isFetching}
          onChange={onTypeChange}/>

        <Select
          id="city"
          label="City"
          value={city}
          options={Object.values(City)}
          disabled={isFetching}
          onChange={onCityChange}/>

        <input
          className="event-form__date-input"
          type="date"
          value={date}
          onChange={onDateChange}/>

      </div>

      <div className="event-form__options">
        {availableOptions.map((option): JSX.Element => (
          <label key={option} className="event-form__option">
            <input
              className="event-form__option-checkbox"
              type="checkbox"
              checked={options.includes(option)}
              onChange={() => onOptionsChange(option)}/>
            {option}
          </label>
        ))}
      </div>

      <div className="event-form__buttons">

        <Button
          mixClassName="event-form__close-button"
          type={ButtonType.BUTTON}
          label="Close"
          disabled={isFetching}
          onClick={onClose}/>

        {id && (
          <Button
            mixClassName="event-form__delete-button"
            type={ButtonType.BUTTON}
            label="Delete"
            disabled={isFetching}
            onClick={onDeleteButtonClick}/>
        )}

        <Button
          mixClassName="event-form__submit-button"
          type={ButtonType.SUBMIT}
          label={event ? 'Edit' : 'Create'}
          disabled={isFetching}
          onClick={doNothing}/>

      </div>

    </form>
  );
};

export default EventForm;
