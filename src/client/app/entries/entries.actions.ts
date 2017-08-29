import { Dispatch } from 'react-redux';
import { Action } from '../app.actions';
import { Comment } from 'models/comment.model';
import { fetchEntries, postCommentRequest } from 'utils/api';

export const GET_ENTRIES = 'GET_ENTRIES';
export const IS_FETCHING ='IS_FETCHING';

export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';

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

export const postComment = (id: string, struct: string, comment: Comment) =>
  (dispatch: Dispatch<Action>) => {
    postCommentRequest(id, comment).then(
      success => {
        dispatch({
          type: POST_COMMENT_SUCCESS
        });
        getEntries(struct)(dispatch);
      },
      error => dispatch({
        type: POST_COMMENT_FAILURE
      })
    )
  }
