import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {AxiosInstance} from 'axios';

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

export enum TextInputType {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export enum LoginFormType {
  SIGN_UP = 'signUp',
  SIGN_IN = 'signIn',
}

export enum EventTypeName {
  CAR = 'car',
  PLANE = 'plane',
  HOTEL = 'hotel',
  FOOD = 'food',
}

export interface EventType {
  name: EventTypeName;
  options: string[];
}

export interface EventTypesToOptions {[eventType: string]: string[]}

export enum City {
  MOSCOW = 'Moscow',
  PRAGUE = 'Prague',
  BERLIN = 'Berlin',
  OSLO = 'Oslo',
}

export const DEFAULT_CITY: City = City.MOSCOW;

export enum TypeFilter {
  DEFAULT = 'default',
  CAR = 'car',
  PLANE = 'plane',
  HOTEL = 'hotel',
  FOOD = 'food',
}

export enum CityFilter {
  DEFAULT = 'default',
  MOSCOW = 'Moscow',
  PRAGUE = 'Prague',
  BERLIN = 'Berlin',
  OSLO = 'Oslo',
}

export enum Sort {
  DEFAULT = 'default',
  TO_HIGH_DATE = 'toHighDate',
  TO_LOW_DATE = 'toLowDate',
}

export interface Event {
  id: string;
  type: EventTypeName;
  city: City;
  date: string;
  options: string[];
}

export type EventWithoutID = Omit<Event, 'id'>

export type EventInServerFormat = EventWithoutID & {_id: string}

export interface IDsToEvents {[id: string]: Event}

export interface State {
  email: string;
  isFetching: boolean;
  error: string;
  options: EventTypesToOptions,
  events: IDsToEvents;
  typeFilter: string;
  cityFilter: string;
  sort: string;
}

export const BASE_URL = 'http://localhost:5000/api';

export type AsyncAction = ThunkAction<void, {}, AxiosInstance, AnyAction>

export interface Credentials {
  email: string;
  password: string;
}

export const ERROR_TIMEOUT: number = 4000;
