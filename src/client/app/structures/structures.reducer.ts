import { Action } from '../app.actions';
import { IS_FETCHING, GET_STRUCTURES } from './structures.actions';
import { Structure } from 'models/structure.model';

export interface StructuresState {
  isFetching: boolean;
  structs: Structure[];
};

const initialState: StructuresState = {
  isFetching: false,
  structs: []
};

const structures = (state = initialState, action: Action) => {
  switch (action.type) {
    case IS_FETCHING:
      return { ...state, isFetching: true }
    case GET_STRUCTURES:
      return { ...state, isFetching: false, structs: action.payload };
    default:
      return state;
  }
};

export default structures;
