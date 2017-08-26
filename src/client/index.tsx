import * as React from 'react';
import { render } from 'react-dom';
import { StyleRoot, Style } from 'radium';
import { globalStyles } from './globalStyles';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import app from './app/app.reducer';
import App from './app/app.container';

const rootReducer = combineReducers({
  app
});

export let store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

render(
  <Provider store={store}>
    <StyleRoot>
      <App/>
      <Style rules={globalStyles} />
    </StyleRoot>
  </Provider>,
  document.getElementById('root')
);
