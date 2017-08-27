import { Action } from '../app.actions';
import { GET_STRUCTURES } from './structures.actions';
import { Structure } from 'models/structure.model';

export interface StructuresState {
  structs: Structure[];
};

const initialState: StructuresState = {
  structs: []
};

const structures = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_STRUCTURES:
      return { ...state, structs: action.payload };
    default:
      return state;
  }
};

export default structures;
