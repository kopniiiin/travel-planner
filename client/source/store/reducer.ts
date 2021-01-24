import {
  TypeFilter,
  CityFilter,
  Sort,
  State,
} from '../const';

import {
  ActionType,
  SetEmailAction,
  SetFetchingStatusAction,
  SetErrorAction,
  SetOptionsAction,
  SetEventsAction,
  SetTypeFilterAction,
  SetCityFilterAction,
  SetSortAction,
  Action,
} from './actions';

const initialState: State = {
  email: '',
  isFetching: false,
  error: '',
  options: {},
  events: {},
  typeFilter: TypeFilter.DEFAULT,
  cityFilter: CityFilter.DEFAULT,
  sort: Sort.DEFAULT,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_EMAIL:
      const {payload: email} = <SetEmailAction> action;
      return {...state, email};
    case ActionType.SET_FETCHING_STATUS:
      const {payload: isFetching} = <SetFetchingStatusAction> action;
      return {...state, isFetching};
    case ActionType.SET_ERROR:
      const {payload: error} = <SetErrorAction> action;
      return {...state, error};
    case ActionType.SET_OPTIONS:
      const {payload: options} = <SetOptionsAction> action;
      return {...state, options};
    case ActionType.SET_EVENTS:
      const {payload: events} = <SetEventsAction> action;
      return {
        ...state,
        events: events.reduce((normalizedEvents, event) => {
          const {id} = event;
          return {...normalizedEvents, [id]: event};
        }, {}),
      };
    case ActionType.SET_TYPE_FILTER:
      const {payload: typeFilter} = <SetTypeFilterAction> action;
      return {...state, typeFilter};
    case ActionType.SET_CITY_FILTER:
      const {payload: cityFilter} = <SetCityFilterAction> action;
      return {...state, cityFilter};
    case ActionType.SET_SORT:
      const {payload: sort} = <SetSortAction> action;
      return {...state, sort};
    default:
      return state;
  }
};

export default reducer;
