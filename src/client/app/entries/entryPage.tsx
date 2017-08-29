import * as React from 'react';
import * as Radium from 'radium';
import { connect, Dispatch } from 'react-redux';
import { withRouter, Route, match } from 'react-router-dom';
import { History } from 'history';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import * as entriesActions from './entries.actions';
import { Entry } from 'models/entry.model';
import { EntryField } from 'models/field.model';
import { Comment } from 'models/comment.model';
import { User } from 'models/user.model';
import entriesStyles from './entries.styles';
import { primaryColor } from 'client/globalStyles';
import { Button } from '../shared/button';

interface Props {
  isFetching: boolean;
  entries: Entry[];
  user: User;
  postComment: (id: string, struct: string, comment: Comment) => Promise<Action>;
  history: History;
  match: match<any>;
}

interface UIState {
  newComment: string;
}

class EntryPage extends React.Component<Props, UIState> {
  constructor() {
    super();
    this.state = {
      newComment: ''
    }
  }

  updateNewComment = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({
      newComment: event.currentTarget.value
    });

  startPostComment = (event: React.MouseEvent<HTMLElement>) => {
    this.props.postComment(
      this.props.match.params.id,
      this.props.match.params.struct,
      {
        comment: this.state.newComment,
        timestamp: new Date(),
        user: this.props.user
      }
    );
    this.setState({ newComment: '' });
  }

  render() {
    const entry: Entry = this.props.entries.filter(x => x._id === this.props.match.params.id)[0];

    const comment = (comment: Comment, i: number) =>
      <div key={i}  style={entriesStyles.comment}>
        <strong style={entriesStyles.strong}>{comment.user.userName}:</strong>
        <p style={entriesStyles.commentText}>{comment.comment}</p>
      </div>;

    const commentInput = () =>
      <div style={entriesStyles.comment}>
        <label style={entriesStyles.commentInput}>
            {'New Comment '}
            <input
              type='text'
              value={this.state.newComment}
              onChange={this.updateNewComment} />
          </label>
          <Button
            text={'Submit'}
            color={primaryColor}
            callback={this.startPostComment}
            styles={{
              margin: '0rem 0.5rem',
              width: '5rem',
              padding: '0.5rem 0rem',
              fontSize: '1rem'
            }}
          />
      </div>;

    const field = (field: EntryField, i: number) =>
      <div key={i} style={entriesStyles.field}>
        <strong style={entriesStyles.strong}>{'Field ' + (i+1)}</strong>
        <div>{field.label + ': ' + field.payload}</div>
      </div>;

    return (
      <div style={entriesStyles.entriesContainer}>
        <h2 style={entriesStyles.h2}>{entry.title}</h2>
        <p><strong style={entriesStyles.strong}>Type: </strong>{entry.type}</p>
        <p><strong style={entriesStyles.strong}>Description: </strong>{entry.description}</p>
        <p><strong style={entriesStyles.strong}>Author: </strong>{entry.author.userName}</p>
        <p><strong style={entriesStyles.strong}>Date Created: </strong>{entry.dateCreated}</p>
        <div>
          {entry.fields.map((x, i) => field(x, i))}
        </div>
        <div style={entriesStyles.commentsContainer}>
          <h3 style={entriesStyles.h3}>Comments</h3>
          {entry.comments.map((x, i) => comment(x, i))}
        </div>
        {this.props.user ? commentInput() : ''}
      </div>
    );
  }
};

const mapStateToProps = (state: State) => ({...state.entries, user: state.login.user});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  postComment: (id: string, struct: string, comment: Comment) =>
    dispatch(entriesActions.postComment(id, struct, comment))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(EntryPage)));
