import {
  TypeFilter,
  CityFilter,
  Sort,
  Event,
  EventInServerFormat,
} from './const';

export const doNothing = (): void => {};

const DATE_ISO_STRING_LENGTH: number = 10;

export const formatDateISOString = (date: Date): string => {
  return date.toISOString().slice(0, DATE_ISO_STRING_LENGTH);
};

export const filterEventsByType = (
    events: Event[],
    typeFilter: string,
): Event[] => {
  return typeFilter === TypeFilter.DEFAULT ?
    events :
    events.filter(({type}) => <string> type === typeFilter);
};

export const filterEventsByCity = (
    events: Event[],
    cityFilter: string,
): Event[] => {
  return cityFilter === CityFilter.DEFAULT ?
    events :
    events.filter(({city}) => <string> city === cityFilter);
};

export const sortEvents = (events: Event[], sort: string): Event[] => {
  const eventsCopy = [...events];

  switch (sort) {
    case Sort.DEFAULT:
      return events;
    case Sort.TO_HIGH_DATE:
      return eventsCopy.sort(({date: a}, {date: b}) => a < b ? -1 : 1);
    case Sort.TO_LOW_DATE:
      return eventsCopy.sort(({date: a}, {date: b}) => a < b ? 1 : -1);
    default:
      return events;
  }
};

export const convertEventFromServerFormat = ({
  _id, type, city, date, options,
}: EventInServerFormat): Event => ({id: _id, type, city, date, options});

export const convertEventsFromServerFormat = (
    events: EventInServerFormat[],
): Event[] => events.map(convertEventFromServerFormat);

export const convertOptionsFromServerFormat = (
    options: {name: string, options: string[]}[],
) => options.reduce((acc, {name, options}) => ({...acc, [name]: options}), {});
