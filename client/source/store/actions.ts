import {AxiosResponse, AxiosError} from 'axios';

import {
  EventTypesToOptions,
  Event,
  AsyncAction,
  Credentials,
  ERROR_TIMEOUT,
} from '../const';

import {
  convertEventsFromServerFormat,
  convertOptionsFromServerFormat
} from '../utils';

import api from '../api';
import storage from '../storage';

export enum ActionType {
  SET_EMAIL = 'setEmail',
  SET_FETCHING_STATUS = 'setFetchingStatus',
  SET_ERROR = 'setError',
  SET_OPTIONS = 'setOptions',
  SET_EVENTS = 'setEvents',
  SET_TYPE_FILTER = 'setTypeFilter',
  SET_CITY_FILTER = 'setCityFilter',
  SET_SORT = 'setSort'
}

export interface SetEmailAction {
  type: ActionType.SET_EMAIL;
  payload: string;
}

export interface SetFetchingStatusAction {
  type: ActionType.SET_FETCHING_STATUS;
  payload: boolean;
}

export interface SetErrorAction {
  type: ActionType.SET_ERROR;
  payload: string;
}

export interface SetOptionsAction {
  type: ActionType.SET_OPTIONS;
  payload: EventTypesToOptions;
}

export interface SetEventsAction {
  type: ActionType.SET_EVENTS;
  payload: Event[];
}

export interface SetTypeFilterAction {
  type: ActionType.SET_TYPE_FILTER;
  payload: string;
}

export interface SetCityFilterAction {
  type: ActionType.SET_CITY_FILTER;
  payload: string;
}

export interface SetSortAction {
  type: ActionType.SET_SORT;
  payload: string;
}

export type Action =
  SetEmailAction |
  SetFetchingStatusAction |
  SetErrorAction |
  SetOptionsAction |
  SetEventsAction |
  SetTypeFilterAction |
  SetCityFilterAction |
  SetSortAction

export const ActionCreator = {
  setEmail: (email: string): SetEmailAction => ({
    type: ActionType.SET_EMAIL,
    payload: email,
  }),
  setFetchingStatus: (isFetching: boolean): SetFetchingStatusAction => ({
    type: ActionType.SET_FETCHING_STATUS,
    payload: isFetching,
  }),
  setError: (error: string): SetErrorAction => ({
    type: ActionType.SET_ERROR,
    payload: error,
  }),
  setOptions: (options: EventTypesToOptions): SetOptionsAction => ({
    type: ActionType.SET_OPTIONS,
    payload: options,
  }),
  setEvents: (events: Event[]): SetEventsAction => ({
    type: ActionType.SET_EVENTS,
    payload: events,
  }),
  setTypeFilter: (typeFilter: string): SetTypeFilterAction => ({
    type: ActionType.SET_TYPE_FILTER,
    payload: typeFilter,
  }),
  setCityFilter: (cityFilter: string): SetCityFilterAction => ({
    type: ActionType.SET_CITY_FILTER,
    payload: cityFilter,
  }),
  setSort: (sort: string): SetSortAction => ({
    type: ActionType.SET_SORT,
    payload: sort,
  }),
};

let errorTimeoutID: number;

export const AsyncActionCreator = {
  register: (credentials: Credentials): AsyncAction => (dispatch) => {
    dispatch(ActionCreator.setFetchingStatus(true));

    api.post('/auth/registration', credentials)
        .then(() => dispatch(AsyncActionCreator.login(credentials)))
        .catch(({message}: AxiosError) => {
          dispatch(AsyncActionCreator._temporarilySetError(message));
          dispatch(ActionCreator.setFetchingStatus(false));
        });
  },

  login: (credentials: Credentials): AsyncAction => (dispatch) => {
    const {email} = credentials;

    dispatch(ActionCreator.setFetchingStatus(true));

    api.post('/auth/login', credentials)
        .then(({data: {token}}: AxiosResponse) => {
          storage.setToken(token);
          storage.setEmail(email);
          dispatch(ActionCreator.setEmail(email));
          dispatch(AsyncActionCreator.loadOptions());
          dispatch(AsyncActionCreator.loadEvents());
        })
        .catch(({message}: AxiosError) => {
          dispatch(AsyncActionCreator._temporarilySetError(message));
          dispatch(ActionCreator.setFetchingStatus(false));
        });
  },

  logout: (): AsyncAction => (dispatch) => {
    storage.removeToken();
    storage.removeEmail();
    dispatch(ActionCreator.setEmail(''));
    dispatch(ActionCreator.setEvents([]));
  },

  loadOptions: (): AsyncAction => (dispatch) => {
    dispatch(ActionCreator.setFetchingStatus(true));

    api.get('/options')
        .then(({data}: AxiosResponse) => dispatch(
            ActionCreator.setOptions(convertOptionsFromServerFormat(data)),
        ))
        .catch(({message}: AxiosError) => dispatch(
            AsyncActionCreator._temporarilySetError(message),
        ))
        .finally(() => dispatch(ActionCreator.setFetchingStatus(false)));
  },

  loadEvents: (): AsyncAction => (dispatch) => {
    dispatch(ActionCreator.setFetchingStatus(true));

    const token = storage.getToken();

    api.get('/events', {headers: {authorization: `Bearer ${token}`}})
        .then(({data}: AxiosResponse) => dispatch(
            ActionCreator.setEvents(convertEventsFromServerFormat(data)),
        ))
        .catch(({message}: AxiosError) => {
          dispatch(AsyncActionCreator._temporarilySetError(message));
        })
        .finally(() => dispatch(ActionCreator.setFetchingStatus(false)));
  },

  createEvent: (event: {
    type: String,
    city: String,
    date: String,
    options: String[],
  }): AsyncAction => (dispatch) => {
    dispatch(ActionCreator.setFetchingStatus(true));

    const token = storage.getToken();

    api.post('/events', event, {headers: {authorization: `Bearer ${token}`}})
        .then(({data}: AxiosResponse) => dispatch(
            ActionCreator.setEvents(convertEventsFromServerFormat(data)),
        ))
        .catch(({message}: AxiosError) => dispatch(
            AsyncActionCreator._temporarilySetError(message),
        ))
        .finally(() => dispatch(ActionCreator.setFetchingStatus(false)));
  },

  updateEvent: (event: {
    id: String,
    type: String,
    city: String,
    date: String,
    options: String[],
  }): AsyncAction => (dispatch) => {
    dispatch(ActionCreator.setFetchingStatus(true));

    const token = storage.getToken();

    api.put(
        `/events/${event.id}`,
        event,
        {headers: {authorization: `Bearer ${token}`}},
    )
        .then(({data}: AxiosResponse) => dispatch(
            ActionCreator.setEvents(convertEventsFromServerFormat(data)),
        ))
        .catch(({message}: AxiosError) => dispatch(
            AsyncActionCreator._temporarilySetError(message),
        ))
        .finally(() => dispatch(ActionCreator.setFetchingStatus(false)));
  },

  deleteEvent: (id: string): AsyncAction => (dispatch) => {
    dispatch(ActionCreator.setFetchingStatus(true));

    const token = storage.getToken();

    api.delete(`/events/${id}`, {headers: {authorization: `Bearer ${token}`}})
        .then(({data}: AxiosResponse) => dispatch(
            ActionCreator.setEvents(convertEventsFromServerFormat(data)),
        ))
        .catch(({message}: AxiosError) => dispatch(
            AsyncActionCreator._temporarilySetError(message),
        ))
        .finally(() => dispatch(ActionCreator.setFetchingStatus(false)));
  },

  _temporarilySetError: (error: string): AsyncAction => (dispatch) => {
    clearTimeout(errorTimeoutID);
    dispatch(ActionCreator.setError(error));

    errorTimeoutID = window.setTimeout(
        () => dispatch(ActionCreator.setError('')),
        ERROR_TIMEOUT,
    );
  },
};
