import * as React from 'react';
import { render } from 'react-dom';
import { StyleRoot, Style } from 'radium';
import { globalStyles } from './globalStyles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import app from './app/app.reducer';
import structures from './app/structures/structures.reducer';
import entries from './app/entries/entries.reducer';
import login from './app/login/login.reducer';
import admin from './app/admin/admin.reducer';
import App from './app/app.container';

const rootReducer = combineReducers({
  app,
  structures,
  entries,
  login,
  admin
});

export let store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

render(
  <Provider store={store}>
    <StyleRoot>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
      <Style rules={globalStyles} />
    </StyleRoot>
  </Provider>,
  document.getElementById('root')
);
