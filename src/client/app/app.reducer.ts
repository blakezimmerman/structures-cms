import { Action } from './app.actions';
import { GET_STRUCTURES } from './app.actions';
import { Structure } from 'models/structure.model';

export interface State {
  app: AppState,
};

export interface AppState {
  structs: Structure[];
};

const initialState: AppState = {
  structs: []
};

const app = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_STRUCTURES:
      return { ...state, structs: action.payload }
    default:
      return state;
  }
};

export default app;
