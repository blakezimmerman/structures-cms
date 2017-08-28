import { Dispatch } from 'react-redux';
import { Action } from '../app.actions';
import { Structure } from 'models/structure.model';
import { Entry } from 'models/entry.model';
import {
  fetchUsers, makeAdminRequest,
  newStructureRequest, updateStructureRequest, deleteStructureRequest,
  newEntryRequest, updateEntryRequest, deleteEntryRequest
} from 'utils/api';
import { getStructures } from '../structures/structures.actions';
import { getEntries } from '../entries/entries.actions';

export const GET_USERS = 'GET_USERS';
export const MAKE_ADMIN_SUCCESS = 'MAKE_ADMIN_SUCCESS';
export const MAKE_ADMIN_FAILURE = 'MAKE_ADMIN_FAILURE';
export const IS_FETCHING ='IS_FETCHING';

export const NEW_STRUCTURE_SUCCESS = 'NEW_STRUCTURE_SUCCESS';
export const UPDATE_STRUCTURE_SUCCESS = 'UPDATE_STRUCTURE_SUCCESS';
export const DELETE_STRUCTURE_SUCCESS = 'DELETE_STRUCTURE_SUCCESS';

export const NEW_STRUCTURE_FAILURE = 'NEW_STRUCTURE_FAILURE';
export const UPDATE_STRUCTURE_FAILURE = 'UPDATE_STRUCTURE_FAILURE';
export const DELETE_STRUCTURE_FAILURE = 'DELETE_STRUCTURE_FAILURE';

export const NEW_ENTRY_SUCCESS = 'NEW_ENTRY_SUCCESS';
export const UPDATE_ENTRY_SUCCESS = 'UPDATE_ENTRY_SUCCESS';
export const DELETE_ENTRY_SUCCESS = 'DELETE_ENTRY_SUCCESS';

export const NEW_ENTRY_FAILURE = 'NEW_ENTRY_FAILURE';
export const UPDATE_ENTRY_FAILURE = 'UPDATE_ENTRY_FAILURE';
export const DELETE_ENTRY_FAILURE = 'DELETE_ENTRY_FAILURE';

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
        return dispatch({
          type: MAKE_ADMIN_SUCCESS,
        })
      },
      error => dispatch({
        type: MAKE_ADMIN_FAILURE,
        error: error
      })
    );
  };

export const newStructure = (struct: Structure) =>
  (dispatch: Dispatch<Action>) =>
    newStructureRequest(struct).then(
      success => dispatch({
        type: NEW_STRUCTURE_SUCCESS,
      }),
      error => dispatch({
        type: NEW_STRUCTURE_FAILURE,
        error: error
      })
    );

export const updateStructure = (struct: Structure) =>
  (dispatch: Dispatch<Action>) =>
    updateStructureRequest(struct).then(
      success => dispatch({
        type: UPDATE_STRUCTURE_SUCCESS,
      }),
      error => dispatch({
        type: UPDATE_STRUCTURE_FAILURE,
        error: error
      })
    );

export const deleteStructure = (id: string) =>
  (dispatch: Dispatch<Action>) =>
    deleteStructureRequest(id).then(
      success => {
        getStructures()(dispatch)
        return dispatch({
          type: DELETE_STRUCTURE_SUCCESS,
        })
      },
      error => dispatch({
        type: DELETE_STRUCTURE_FAILURE,
        error: error
      })
    );

export const newEntry = (entry: Entry) =>
  (dispatch: Dispatch<Action>) =>
    newEntryRequest(entry).then(
      success => dispatch({
        type: NEW_ENTRY_SUCCESS,
      }),
      error => dispatch({
        type: NEW_ENTRY_FAILURE,
        error: error
      })
    );

export const updateEntry = (entry: Entry) =>
  (dispatch: Dispatch<Action>) =>
    updateEntryRequest(entry).then(
      success => dispatch({
        type: UPDATE_ENTRY_SUCCESS,
      }),
      error => dispatch({
        type: UPDATE_ENTRY_FAILURE,
        error: error
      })
    );

export const deleteEntry = (id: string, struct: string) =>
  (dispatch: Dispatch<Action>) =>
    deleteEntryRequest(id).then(
      success => {
        getEntries(struct)(dispatch)
        return dispatch({
          type: DELETE_ENTRY_SUCCESS,
        })
      },
      error => dispatch({
        type: DELETE_ENTRY_FAILURE,
        error: error
      })
    );
