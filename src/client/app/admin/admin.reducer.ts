import { State } from '../app.reducer';
import { Action } from '../app.actions';
import {
  GET_USERS, MAKE_ADMIN_SUCCESS, MAKE_ADMIN_FAILURE,
  NEW_STRUCTURE_SUCCESS, UPDATE_STRUCTURE_SUCCESS, DELETE_STRUCTURE_SUCCESS,
  NEW_STRUCTURE_FAILURE, UPDATE_STRUCTURE_FAILURE, DELETE_STRUCTURE_FAILURE,
  IS_FETCHING
} from './admin.actions';
import { User } from 'models/user.model';

export interface AdminState {
  users: User[];
  isFetching: boolean;
  error: string;
};

const initialState: AdminState = {
  users: [],
  isFetching: false,
  error: ''
};

const login = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        isFetching: false,
        error: ''
      };
    case MAKE_ADMIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: ''
      };
    case MAKE_ADMIN_FAILURE:
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
    case NEW_STRUCTURE_SUCCESS:
      return {
        ...state,
        error: ''
      };
    case NEW_STRUCTURE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_STRUCTURE_SUCCESS:
      return {
        ...state,
        error: ''
      };
    case UPDATE_STRUCTURE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_STRUCTURE_SUCCESS:
      return {
        ...state,
        error: ''
      };
    case DELETE_STRUCTURE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default login;
