import { Dispatch } from 'react-redux';
import { fetchStructures } from 'utils/api';

export interface Action {
  type: string;
  payload: any;
}

export const UPDATE_HEADER = 'UPDATE_HEADER';
export const GET_STRUCTURES = 'GET_STRUCTURES';

export const updateHeader = (heading: JSX.Element) => ({
  type: UPDATE_HEADER,
  payload: heading
});

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
