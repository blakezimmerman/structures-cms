import { Dispatch } from 'react-redux';
import { Action } from '../app.actions';
import { NewUser } from 'models/user.model';
import {
  loginRequest, logoutRequest, registerRequest,
  passiveLoginRequest
} from 'utils/api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const IS_FETCHING = 'IS_FETCHING';

export const login = (requestedUser: NewUser) =>
  (dispatch: Dispatch<Action>) => {
    dispatch({ type: IS_FETCHING });
    loginRequest(requestedUser).then(
      user => dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      }),
      error => dispatch({
        type: LOGIN_FAILURE,
        payload: error
      })
    );
  };

export const logout = () =>
  (dispatch: Dispatch<Action>) => {
    dispatch({ type: IS_FETCHING });
    logoutRequest().then(
      success => dispatch({
        type: LOGOUT_SUCCESS
      }),
      error => dispatch({
        type: LOGOUT_FAILURE,
        payload: error
      })
    );
  };

export const register = (user: NewUser) =>
  (dispatch: Dispatch<Action>) => {
    registerRequest(user).then(
      success => dispatch({
        type: REGISTER_SUCCESS
      }),
      error => dispatch({
        type: REGISTER_FAILURE,
        payload: error
      })
    );
  };

export const passiveLogin = () =>
  (dispatch: Dispatch<Action>) =>
    passiveLoginRequest().then(
      user => dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      }),
      error => error
    );
