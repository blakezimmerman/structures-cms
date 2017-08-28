import { Dispatch } from 'react-redux';
import { Action } from '../app.actions';
import { fetchEntries } from 'utils/api';

export const GET_ENTRIES = 'GET_ENTRIES';
export const IS_FETCHING ='IS_FETCHING';

export const getEntries = (struct: string) =>
  (dispatch: Dispatch<Action>) => {
    dispatch({ type: IS_FETCHING });
    fetchEntries(struct).then(
      entries => dispatch({
        type: GET_ENTRIES,
        payload: entries
      }),
      error => dispatch({
        type: GET_ENTRIES,
        payload: undefined
      })
    );
  };
