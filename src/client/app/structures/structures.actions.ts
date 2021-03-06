import { Dispatch } from 'react-redux';
import { Action } from '../app.actions';
import { fetchStructures } from 'utils/api';

export const GET_STRUCTURES = 'GET_STRUCTURES';
export const IS_FETCHING ='IS_FETCHING';

export const getStructures = () =>
  (dispatch: Dispatch<Action>) => {
    dispatch({ type: IS_FETCHING });
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
  };
