import {State} from '../const';
import {filterEventsByType, filterEventsByCity, sortEvents} from '../utils';

const Selector = {
  getEmail: ({email}: State) => email,
  getFetchingStatus: ({isFetching}: State) => isFetching,
  getError: ({error}: State) => error,
  getEventTypes: ({options}: State) => Object.keys(options),
  getOptionsByEventType: ({options}: State, type: string) => options[type],
  getTypeFilter: ({typeFilter}: State) => typeFilter,
  getCityFilter: ({cityFilter}: State) => cityFilter,
  getSort: ({sort}: State) => sort,
  getEventByID: ({events}: State, id: string) => events[id],
  getFilteredAndSortedEventIDs: (state: State) => {
    const {events, typeFilter, cityFilter, sort} = state;

    let filteredAndSortedEvents = Object.values(events);

    filteredAndSortedEvents = filterEventsByType(
        filteredAndSortedEvents,
        typeFilter,
    );

    filteredAndSortedEvents = filterEventsByCity(
        filteredAndSortedEvents,
        cityFilter,
    );

    filteredAndSortedEvents = sortEvents(
        filteredAndSortedEvents,
        sort,
    );

    return filteredAndSortedEvents.map(({id}) => id);
  },
};

export default Selector;
