import { AppAction } from './app.actions';

export interface State {
  app: AppState,
};

export interface AppState {

};

const initialState: AppState = {

};

const app = (state = initialState, action: AppAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default app;
