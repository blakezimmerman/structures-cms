import { Action } from './app.actions';
import { UPDATE_HEADER, GET_STRUCTURES } from './app.actions';
import { Structure } from 'models/structure.model';
import heading from './header/heading';

export interface State {
  app: AppState;
};

export interface AppState {
  heading: JSX.Element;
  structs: Structure[];
};

const initialState: AppState = {
  heading: heading,
  structs: []
};

const app = (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_HEADER:
      return { ...state, heading: action.payload };
    case GET_STRUCTURES:
      return { ...state, structs: action.payload };
    default:
      return state;
  }
};

export default app;
