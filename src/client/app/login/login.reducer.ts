import { State } from '../app.reducer';
import { Action } from '../app.actions';
import {
  LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_SUCCESS, LOGOUT_FAILURE,
  REGISTER_SUCCESS, REGISTER_FAILURE,
  IS_FETCHING
} from './login.actions';
import { User } from 'models/user.model';

export interface LoginState {
  user: User | undefined;
  isFetching: boolean;
  error: string;
};

const initialState: LoginState = {
  user: undefined,
  isFetching: false,
  error: ''
};

const login = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: ''
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: undefined,
        isFetching: false,
        error: ''
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: ''
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case IS_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    default:
      return state;
  }
};

export default login;
