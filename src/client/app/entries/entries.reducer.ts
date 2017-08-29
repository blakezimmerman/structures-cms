import { Action } from '../app.actions';
import {
  IS_FETCHING, GET_ENTRIES,
  POST_COMMENT_SUCCESS, POST_COMMENT_FAILURE
} from './entries.actions';
import { Entry } from 'models/entry.model';

export interface EntriesState {
  isFetching: boolean;
  entries: Entry[];
};

const initialState: EntriesState = {
  isFetching: false,
  entries: []
};

const entries = (state = initialState, action: Action) => {
  switch (action.type) {
    case IS_FETCHING:
      return { ...state, isFetching: true }
    case GET_ENTRIES:
      return { ...state, isFetching: false, entries: action.payload };
    case POST_COMMENT_SUCCESS:
      return { ...state }
    case POST_COMMENT_FAILURE:
      return { ...state }
    default:
      return state;
  }
};

export default entries;
