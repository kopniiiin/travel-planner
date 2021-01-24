import './components/document/document.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import {ActionCreator, AsyncActionCreator} from './store/actions';
import api from './api';
import storage from './storage';
import App from './components/app/app';

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api)),
);

ReactDOM.render(
    <Provider store={store}>
      <App mixClassName='document__app'/>
    </Provider>,
    document.querySelector('#root'),
);

const token = storage.getToken();
const email = storage.getEmail();

if (token && email) {
  store.dispatch(ActionCreator.setEmail(email));
  store.dispatch(AsyncActionCreator.loadOptions());
  store.dispatch(AsyncActionCreator.loadEvents());
}
