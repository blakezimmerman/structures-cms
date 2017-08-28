import * as React from 'react';
import * as Radium from 'radium';
import { connect, Dispatch } from 'react-redux';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import adminStyles from './admin.styles';
import { primaryColor } from 'client/globalStyles';
import { ClickFunction, Button } from '../shared/button';
import * as adminActions from './admin.actions';
import { User } from 'models/user.model';
import { fromNullable } from 'utils/functions';

interface Props {
  isFetching: boolean;
  users: User[];
  error: string;
  getUsers: () => Promise<Action>;
  makeAdmin: (userName: string) => Promise<Action>;
}
class UsersPanel extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUsers();
  }

  makeAdminClick = (userName: string) =>
    (event: React.MouseEvent<HTMLElement>) =>
      this.props.makeAdmin(userName)

  render() {
    const makeAdminButton = (userName: string) =>
      <Button
        text={'Make Admin'}
        color={primaryColor}
        callback={this.makeAdminClick(userName)}
        styles={{
          margin: '0rem 1rem',
          padding: '0.6rem 0rem',
        }}
      />;

    const user = (user: User) =>
      <div
        key={user.userName}
        style={adminStyles.listItem}
      >
        <div style={adminStyles.info}>{user.userName}</div>
        <div style={adminStyles.info}>Is Admin: {user.isAdmin ? 'Yes' : 'No'}</div>
        <div style={adminStyles.info}>{user.isAdmin ? ''
          : makeAdminButton(user.userName)
        }</div>
      </div>;

    return (
      <div style={adminStyles.adminContainer}>
        Users Panel
        {this.props.isFetching ? 'Loading' :
          fromNullable(this.props.users)
            .fold((e: any) => 'An Error Occured',
              (x: User[]) => !x.length ?
                'No Users Yet' :  x.map(y => user(y)))
        }
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({...state.admin});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getUsers: () => dispatch(adminActions.getUsers()),
  makeAdmin: (userName: string) => dispatch(adminActions.makeAdmin(userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Radium(UsersPanel));
