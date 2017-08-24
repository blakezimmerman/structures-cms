import { Action } from './app.actions';
import { GET_STRUCTURES } from './app.actions';
import { Structure } from 'models/structure.model';

export interface State {
  app: AppState,
};

export interface AppState {
  structures: Structure[];
};

const initialState: AppState = {
  structures: []
};

const app = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_STRUCTURES:
      return { ...state, structures: action.payload }
    default:
      return state;
  }
};

export default app;
