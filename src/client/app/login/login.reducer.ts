import { State } from '../app.reducer';
import { Action } from '../app.actions';
import { LOGIN, LOGOUT, IS_AUTHENTICATED } from './login.actions';

export interface LoginState {
  isAuthenticated: boolean;
};

const initialState: LoginState = {
  isAuthenticated: false
};

const login = (state = initialState, action: Action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

export default login;
