import { Dispatch } from 'react-redux';
import { fetchStructures } from 'utils/api';

export interface Action {
  type: string;
  payload: any;
}

export const GET_STRUCTURES = 'GET_STRUCTURES';

export const getStructures = () =>
  (dispatch: Dispatch<Action>) =>
    fetchStructures().then(
      structs => dispatch({
        type: GET_STRUCTURES,
        payload: structs
      }),
      error => dispatch({
        type: GET_STRUCTURES,
        payload: undefined
      })
    );
