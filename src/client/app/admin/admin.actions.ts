import { Dispatch } from 'react-redux';
import { Action } from '../app.actions';
import { fetchUsers, makeAdminRequest } from 'utils/api';

export const GET_USERS = 'GET_USERS';
export const MAKE_ADMIN_SUCCESS = 'MAKE_ADMIN_SUCCESS';
export const MAKE_ADMIN_FAILURE = 'MAKE_ADMIN_FAILURE';
export const IS_FETCHING ='IS_FETCHING';

export const getUsers = () =>
  (dispatch: Dispatch<Action>) => {
    dispatch({ type: IS_FETCHING });
    fetchUsers().then(
      users => dispatch({
        type: GET_USERS,
        payload: users
      }),
      error => dispatch({
        type: GET_USERS,
        payload: undefined
      })
    );
  };

export const makeAdmin = (userName: string) =>
  (dispatch: Dispatch<Action>) => {
    dispatch({ type: IS_FETCHING });
    makeAdminRequest(userName).then(
      success => {
        getUsers()(dispatch);
        dispatch({
          type: MAKE_ADMIN_SUCCESS,
        })
      },
      error => dispatch({
        type: MAKE_ADMIN_FAILURE,
        error: error
      })
    );
  };
